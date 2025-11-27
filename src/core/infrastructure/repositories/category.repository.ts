import { prisma } from '../database/prisma'
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/core/domain/types'

export const CategoryRepository = {
  // Obtener todas las categorías
  async findAll(includeProducts = false): Promise<Category[]> {
    return prisma.category.findMany({
      where: { isActive: true },
      include: includeProducts ? { products: true } : undefined,
      orderBy: { order: 'asc' },
    }) as Promise<Category[]>
  },

  // Obtener todas (incluyendo inactivas) para admin
  async findAllAdmin(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { products: true } } },
    }) as unknown as Promise<Category[]>
  },

  // Obtener categoría por ID
  async findById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true },
    }) as Promise<Category | null>
  },

  // Obtener categoría por slug
  async findBySlug(slug: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { slug },
      include: { products: { where: { isActive: true } } },
    }) as Promise<Category | null>
  },

  // Crear categoría
  async create(data: CreateCategoryDTO): Promise<Category> {
    return prisma.category.create({ data }) as Promise<Category>
  },

  // Actualizar categoría
  async update({ id, ...data }: UpdateCategoryDTO): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    }) as Promise<Category>
  },

  // Eliminar categoría
  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } })
  },

  // Contar categorías
  async count(): Promise<number> {
    return prisma.category.count({ where: { isActive: true } })
  },
}
