// Datos estáticos de usuarios
const MOCK_USERS = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'admin@test.com',
    password: 'admin123',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2', 
    name: 'María García',
    email: 'user@test.com',
    password: 'user123',
    createdAt: '2024-01-02T00:00:00Z'
  }
]

// Datos estáticos de productos simplificados
let MOCK_PRODUCTS = [
  {
    id: '1',
    nombre: 'iPhone 15 Pro',
    descripcion: 'Smartphone Apple con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.1 pulgadas',
    precio: 1199.99,
    categoria: 'Electrónicos'
  },
  {
    id: '2',
    nombre: 'MacBook Air M3',
    descripcion: 'Laptop ultradelgada con chip M3, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería',
    precio: 1299.99,
    categoria: 'Electrónicos'
  },
  {
    id: '3',
    nombre: 'Camiseta Nike Dri-FIT',
    descripcion: 'Camiseta deportiva de alta calidad con tecnología Dri-FIT para mantener la piel seca',
    precio: 29.99,
    categoria: 'Ropa'
  },
  {
    id: '4',
    nombre: 'El Quijote de la Mancha',
    descripcion: 'Edición especial de la obra maestra de Miguel de Cervantes con ilustraciones originales',
    precio: 24.99,
    categoria: 'Libros'
  },
  {
    id: '5',
    nombre: 'Sofá Moderno 3 Plazas',
    descripcion: 'Sofá cómodo y elegante tapizado en tela gris, perfecto para salas de estar modernas',
    precio: 899.99,
    categoria: 'Hogar'
  },
  {
    id: '6',
    nombre: 'Balón de Fútbol Adidas',
    descripcion: 'Balón oficial de fútbol con tecnología FIFA Quality Pro, ideal para partidos profesionales',
    precio: 49.99,
    categoria: 'Deportes'
  },
  {
    id: '7',
    nombre: 'Samsung Galaxy S24',
    descripcion: 'Smartphone Android con cámara de 200MP, pantalla Dynamic AMOLED 2X y procesador Snapdragon 8 Gen 3',
    precio: 999.99,
    categoria: 'Electrónicos'
  },
  {
    id: '8',
    nombre: 'Jeans Levi\'s 501',
    descripcion: 'Jeans clásicos de corte recto, 100% algodón, disponibles en color azul índigo',
    precio: 89.99,
    categoria: 'Ropa'
  },
  {
    id: '9',
    nombre: 'Cien Años de Soledad',
    descripcion: 'Obra maestra de Gabriel García Márquez, edición conmemorativa con prólogo especial',
    precio: 19.99,
    categoria: 'Libros'
  },
  {
    id: '10',
    nombre: 'Mesa de Comedor Roble',
    descripcion: 'Mesa de comedor para 6 personas en madera de roble macizo con acabado natural',
    precio: 599.99,
    categoria: 'Hogar'
  },
  {
    id: '11',
    nombre: 'Raqueta de Tenis Wilson',
    descripcion: 'Raqueta profesional de tenis con marco de grafito y peso equilibrado para jugadores intermedios',
    precio: 149.99,
    categoria: 'Deportes'
  },
  {
    id: '12',
    nombre: 'Auriculares Sony WH-1000XM5',
    descripcion: 'Auriculares inalámbricos con cancelación de ruido líder en la industria y 30 horas de batería',
    precio: 399.99,
    categoria: 'Electrónicos'
  },
  {
    id: '13',
    nombre: 'Zapatillas Nike Air Max',
    descripcion: 'Zapatillas deportivas con tecnología Air Max para máxima comodidad y estilo urbano',
    precio: 129.99,
    categoria: 'Ropa'
  },
  {
    id: '14',
    nombre: 'Harry Potter Colección',
    descripcion: 'Colección completa de los 7 libros de Harry Potter en edición de lujo con tapas duras',
    precio: 149.99,
    categoria: 'Libros'
  },
  {
    id: '15',
    nombre: 'Lámpara de Mesa LED',
    descripcion: 'Lámpara de escritorio con luz LED regulable, diseño minimalista y carga USB',
    precio: 45.99,
    categoria: 'Hogar'
  }
]

// Función para simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Función para generar ID único
const generateId = () => Date.now().toString()

// Simulación de API de autenticación
export const authAPI = {
  /**
   * Iniciar sesión
   * Credenciales válidas:
   * - Email: admin@test.com, Password: admin123
   * - Email: user@test.com, Password: user123
   */
  login: async (credentials: { email: string; password: string }) => {
    await delay(1000) // Simular delay de red
    
    const user = MOCK_USERS.find(u => 
      u.email === credentials.email && u.password === credentials.password
    )
    
    if (!user) {
      throw new Error('Credenciales inválidas. Usa admin@test.com/admin123 o user@test.com/user123')
    }
    
    const { password, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
      token: `mock-token-${user.id}-${Date.now()}`
    }
  },

  /**
   * Registrar nuevo usuario
   * Simula el registro pero no persiste los datos
   */
  register: async (userData: { name: string; email: string; password: string }) => {
    await delay(1000)
    
    // Verificar si el email ya existe
    const existingUser = MOCK_USERS.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('El email ya está registrado')
    }
    
    // Simular creación de usuario
    const newUser = {
      id: generateId(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date().toISOString()
    }
    
    return {
      user: newUser,
      token: `mock-token-${newUser.id}-${Date.now()}`
    }
  }
}

// Simulación de API de productos
export const productAPI = {
  /**
   * Obtener productos con paginación
   */
  getProducts: async (params: { page: number; limit: number }) => {
    await delay(800)
    
    const { page, limit } = params
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    const paginatedProducts = MOCK_PRODUCTS.slice(startIndex, endIndex)
    
    return {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total: MOCK_PRODUCTS.length,
        totalPages: Math.ceil(MOCK_PRODUCTS.length / limit)
      }
    }
  },

  /**
   * Crear nuevo producto
   */
  createProduct: async (data: any) => {
    await delay(600)
    
    // Validar que el precio sea mayor que 0
    if (data.precio <= 0) {
      throw new Error('El precio debe ser mayor que 0')
    }
    
    // Validar que el nombre sea obligatorio
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre es obligatorio')
    }
    
    const newProduct = {
      id: generateId(),
      nombre: data.nombre.trim(),
      descripcion: data.descripcion || '',
      precio: parseFloat(data.precio),
      categoria: data.categoria
    }
    
    MOCK_PRODUCTS.unshift(newProduct)
    return newProduct
  },

  /**
   * Actualizar producto existente
   */
  updateProduct: async (id: string, data: any) => {
    await delay(600)
    
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Producto no encontrado')
    }
    
    // Validar precio si se proporciona
    if (data.precio !== undefined && data.precio <= 0) {
      throw new Error('El precio debe ser mayor que 0')
    }
    
    // Validar nombre si se proporciona
    if (data.nombre !== undefined && (!data.nombre || data.nombre.trim() === '')) {
      throw new Error('El nombre es obligatorio')
    }
    
    const updatedData = { ...data }
    if (updatedData.nombre) {
      updatedData.nombre = updatedData.nombre.trim()
    }
    if (updatedData.precio) {
      updatedData.precio = parseFloat(updatedData.precio)
    }
    
    MOCK_PRODUCTS[index] = {
      ...MOCK_PRODUCTS[index],
      ...updatedData
    }
    
    return MOCK_PRODUCTS[index]
  },

  /**
   * Eliminar producto
   */
  deleteProduct: async (id: string) => {
    await delay(500)
    
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Producto no encontrado')
    }
    
    MOCK_PRODUCTS.splice(index, 1)
    return { success: true }
  }
}
