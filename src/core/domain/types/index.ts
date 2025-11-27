// Tipos base del dominio

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string | null
  price: number
  comparePrice: number | null
  mainImage: string
  images: string[]
  specs: ProductSpec[]
  metaTitle: string | null
  metaDesc: string | null
  isActive: boolean
  isFeatured: boolean
  isNew: boolean
  stock: number
  inStock: boolean
  categoryId: string
  category?: Category
  createdAt: Date
  updatedAt: Date
}

export interface ProductSpec {
  name: string
  value: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  order: number
  isActive: boolean
  products?: Product[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface SiteConfig {
  id: string
  siteName: string
  tagline: string | null
  description: string | null
  logo: string | null
  favicon: string | null
  email: string | null
  phone: string | null
  address: string | null
  socialLinks: SocialLink[]
  metaTitle: string | null
  metaDesc: string | null
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

// DTOs para creación/actualización
export interface CreateProductDTO {
  name: string
  slug: string
  description: string
  shortDesc?: string
  price: number
  comparePrice?: number
  mainImage: string
  images?: string[]
  specs?: ProductSpec[]
  categoryId: string
  isActive?: boolean
  isFeatured?: boolean
  isNew?: boolean
  stock?: number
  inStock?: boolean
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string
}

export interface CreateCategoryDTO {
  name: string
  slug: string
  description?: string
  image?: string
  order?: number
  isActive?: boolean
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
  id: string
}

// Respuestas paginadas
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Filtros de búsqueda
export interface ProductFilters {
  categoryId?: string
  isActive?: boolean
  isFeatured?: boolean
  isNew?: boolean
  search?: string
  page?: number
  pageSize?: number
}
