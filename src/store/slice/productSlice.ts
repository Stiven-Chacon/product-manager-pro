import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productAPI } from '../../lib/api.ts'
import { Product, CreateProductData, UpdateProductData } from '../../types/product.ts'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await productAPI.getProducts(params)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar productos')
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: CreateProductData, { rejectWithValue }) => {
    try {
      const response = await productAPI.createProduct(productData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear producto')
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data: UpdateProductData & { id: string }, { rejectWithValue }) => {
    try {
      const response = await productAPI.updateProduct(data.id, data)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al actualizar producto')
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await productAPI.deleteProduct(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al eliminar producto')
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.unshift(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const index = state.products.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.filter(p => p.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = productSlice.actions
export default productSlice.reducer
