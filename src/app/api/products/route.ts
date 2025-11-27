import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ProductRepository } from '@/core/infrastructure/repositories/product.repository'

// GET - Listar productos
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '12')
    const categoryId = searchParams.get('categoryId') || undefined
    const search = searchParams.get('search') || undefined
    const isActive = searchParams.get('isActive') === 'true' ? true :
                     searchParams.get('isActive') === 'false' ? false : undefined

    const result = await ProductRepository.findAll({
      page,
      pageSize,
      categoryId,
      search,
      isActive,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 })
  }
}

// POST - Crear producto
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()

    // Validaciones básicas
    if (!data.name || !data.slug || !data.description || !data.price || !data.categoryId || !data.mainImage) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const product = await ProductRepository.create(data)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}
