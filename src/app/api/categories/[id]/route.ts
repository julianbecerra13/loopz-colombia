import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { CategoryRepository } from '@/core/infrastructure/repositories/category.repository'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Obtener categoría por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const category = await CategoryRepository.findById(id)

    if (!category) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json({ error: 'Error al obtener categoría' }, { status: 500 })
  }
}

// PUT - Actualizar categoría
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const category = await CategoryRepository.update({ id, ...data })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Error al actualizar categoría' }, { status: 500 })
  }
}

// DELETE - Eliminar categoría
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    await CategoryRepository.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Error al eliminar categoría' }, { status: 500 })
  }
}
