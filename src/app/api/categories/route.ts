import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { CategoryRepository } from '@/core/infrastructure/repositories/category.repository'

// GET - Listar categorías
export async function GET() {
  try {
    const categories = await CategoryRepository.findAll()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 })
  }
}

// POST - Crear categoría
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()

    if (!data.name || !data.slug) {
      return NextResponse.json({ error: 'Nombre y slug son requeridos' }, { status: 400 })
    }

    const category = await CategoryRepository.create(data)

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Error al crear categoría' }, { status: 500 })
  }
}
