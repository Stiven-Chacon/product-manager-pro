"use client"

import { useState, useEffect } from "react"
import { Product } from "../../types/product.ts"
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts"
import { createProduct, updateProduct } from "../../store/slice/productSlice.ts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.tsx"
import { Alert, AlertDescription } from "../ui/alert.tsx"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input.tsx"
import { Button } from "../ui/button.tsx"
import { Loader2 } from "lucide-react"
import { Textarea } from "../ui/textarea.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx"


interface ProductFormProps {
  product?: Product
  onClose: () => void
  onSuccess: () => void
}

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.products)
  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: ""
  })

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio.toString(),
        categoria: product.categoria
      })
    }
  }, [product])

  const validateForm = () => {
    const errors: string[] = []
    
    // Validar nombre obligatorio
    if (!formData.nombre.trim()) {
      errors.push("El nombre es obligatorio")
    }
    
    // Validar precio mayor que 0
    const precio = parseFloat(formData.precio)
    if (isNaN(precio) || precio <= 0) {
      errors.push("El precio debe ser mayor que 0")
    }
    
    // Validar categoría
    if (!formData.categoria) {
      errors.push("La categoría es obligatoria")
    }
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const productData = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: parseFloat(formData.precio),
      categoria: formData.categoria
    }

    let result
    if (product) {
      result = await dispatch(updateProduct({ id: product.id, ...productData }))
    } else {
      result = await dispatch(createProduct(productData))
    }

    if (createProduct.fulfilled.match(result) || updateProduct.fulfilled.match(result)) {
      onSuccess()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Limpiar errores de validación cuando el usuario empiece a escribir
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {(error || validationErrors.length > 0) && (
            <Alert variant="destructive">
              <AlertDescription>
                {error && <div>{error}</div>}
                {validationErrors.map((err, index) => (
                  <div key={index}>• {err}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre del producto"
              className={validationErrors.some(e => e.includes("nombre")) ? "border-red-500" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del producto"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="precio">
              Precio <span className="text-red-500">*</span>
            </Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.precio}
              onChange={handleChange}
              required
              placeholder="0.00"
              className={validationErrors.some(e => e.includes("precio")) ? "border-red-500" : ""}
            />
            <p className="text-xs text-gray-500">El precio debe ser mayor que 0</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">
              Categoría <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.categoria} 
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, categoria: value }))
                if (validationErrors.length > 0) {
                  setValidationErrors([])
                }
              }}
            >
              <SelectTrigger className={validationErrors.some(e => e.includes("categoría")) ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electrónicos">Electrónicos</SelectItem>
                <SelectItem value="Ropa">Ropa</SelectItem>
                <SelectItem value="Libros">Libros</SelectItem>
                <SelectItem value="Hogar">Hogar</SelectItem>
                <SelectItem value="Deportes">Deportes</SelectItem>
                <SelectItem value="Otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
