import { Link } from 'react-router-dom'
import { RegisterForm } from '../components/auth/RegisterForm.tsx'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Crear Cuenta</h1>
          <p className="mt-2 text-gray-600">Regístrate para comenzar</p>
        </div>
        <RegisterForm />
        <div className="text-center">
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-500">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
