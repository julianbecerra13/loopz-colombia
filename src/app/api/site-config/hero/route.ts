import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/core/infrastructure/database/prisma'

// GET - Obtener configuración del hero
export async function GET() {
  try {
    let config = await prisma.siteConfig.findUnique({
      where: { id: 'main' }
    })

    // Si no existe, crear configuración por defecto
    if (!config) {
      config = await prisma.siteConfig.create({
        data: { id: 'main' }
      })
    }

    // Si hay heroProductId, obtener el producto
    let heroProduct = null
    if (config.heroProductId) {
      const product = await prisma.product.findUnique({
        where: { id: config.heroProductId },
        include: { category: true }
      })
      if (product) {
        heroProduct = {
          ...product,
          images: product.images ? JSON.parse(product.images) : [],
          specs: product.specs ? JSON.parse(product.specs) : [],
        }
      }
    }

    return NextResponse.json({ heroProductId: config.heroProductId, heroProduct })
  } catch (error) {
    console.error('Error fetching hero config:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// PUT - Actualizar producto del hero
export async function PUT(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { heroProductId } = await request.json()

    // Validar que el producto existe si se proporciona
    if (heroProductId) {
      const product = await prisma.product.findUnique({
        where: { id: heroProductId }
      })
      if (!product) {
        return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
      }
    }

    // Actualizar o crear configuración
    const config = await prisma.siteConfig.upsert({
      where: { id: 'main' },
      update: { heroProductId },
      create: { id: 'main', heroProductId }
    })

    return NextResponse.json({ success: true, heroProductId: config.heroProductId })
  } catch (error) {
    console.error('Error updating hero config:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
