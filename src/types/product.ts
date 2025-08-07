export interface Product {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
}

export interface CreateProductData {
  nombre: string
  descripcion: string
  precio: number
  categoria: string
}

export interface UpdateProductData {
  nombre?: string
  descripcion?: string
  precio?: number
  categoria?: string
}

export interface ProductsResponse {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
