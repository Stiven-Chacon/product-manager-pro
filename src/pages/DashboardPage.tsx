import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../store/hooks.ts"
import { Header } from "../components/layout/header.tsx"
import { Button } from "../components/ui/button.tsx"
import { Plus, Database } from 'lucide-react'
import { Alert, AlertDescription } from "../components/ui/alert.tsx"
import { fetchProducts } from "../store/slice/productSlice.ts"
import { ProductTable } from "../components/product/product-table.tsx"
import { ProductForm } from "../components/product/product-form.tsx"
import { ProductStats } from "../components/product/product-stats.tsx"

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
            <p className="text-gray-600 mb-4">Gestiona tu inventario de productos</p>
            
            <Alert className="mb-4 border-amber-200 bg-amber-50">
              <Database className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Modo Demo:</strong> Los datos son estáticos (ID, Nombre, Descripción, Precio, Categoría) y se reinician al recargar la página.
              </AlertDescription>
            </Alert>
            
            <ProductStats />
          </div>
          
          <Button 
            onClick={() => setShowForm(true)} 
            className="flex items-center gap-2 lg:mt-0"
          >
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <ProductTable />
        </div>

        {showForm && (
          <ProductForm
            onClose={() => setShowForm(false)}
            onSuccess={() => setShowForm(false)}
          />
        )}
      </main>
    </div>
  )
}
