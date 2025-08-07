import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../ui/button.tsx"
import { Input } from "../ui/input.tsx"
import { Label } from "../ui/label.tsx"
import { Alert, AlertDescription } from "../ui/alert.tsx"
import { Loader2, Info } from 'lucide-react'
import { login } from "../../store/slice/authSlice.ts"
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(login({ email, password }))
    if (login.fulfilled.match(result)) {
      navigate("/dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Credenciales de prueba:</strong><br />
          • Admin: admin@test.com / admin123<br />
          • Usuario: user@test.com / user123
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Iniciar Sesión
      </Button>

      <div className="text-center">
        <Link to="/register" className="text-sm text-blue-600 hover:text-blue-500">
          ¿No tienes cuenta? Regístrate
        </Link>
      </div>
    </form>
  )
}
