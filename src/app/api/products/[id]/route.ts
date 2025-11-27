import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Obtener producto por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const product = await ProductRepository.findById(id)

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Error al obtener producto' }, { status: 500 })
  }
}

// PUT - Actualizar producto
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const product = await ProductRepository.update({ id, ...data })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    await ProductRepository.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 })
  }
}
