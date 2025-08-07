"use client"

import { Package, TrendingUp, DollarSign, Tag } from 'lucide-react'
import { useAppSelector } from "../../store/hooks.ts"
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx'

export function ProductStats() {
  const { products } = useAppSelector((state) => state.products)

  const stats = {
    total: products.length,
    avgPrice: products.length > 0 ? products.reduce((sum, p) => sum + p.precio, 0) / products.length : 0,
    maxPrice: products.length > 0 ? Math.max(...products.map(p => p.precio)) : 0,
    categories: [...new Set(products.map(p => p.categoria))].length
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">productos registrados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.avgPrice.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">precio promedio</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Precio Máximo</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.maxPrice.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">producto más caro</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categorías</CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.categories}</div>
          <p className="text-xs text-muted-foreground">categorías diferentes</p>
        </CardContent>
      </Card>
    </div>
  )
}
