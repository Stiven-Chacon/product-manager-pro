import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice.ts'
import productSlice from './slice/productSlice.ts'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
