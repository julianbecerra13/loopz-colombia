import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No se ha proporcionado ningún archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no válido. Solo se permiten: JPG, PNG, WEBP, GIF' },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 10MB para Cloudinary)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 10MB' },
        { status: 400 }
      )
    }

    // Convertir archivo a base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'loopz-colombia/products',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' }, // Limitar tamaño máximo
        { quality: 'auto:good' }, // Optimizar calidad
        { fetch_format: 'auto' }, // Formato automático (webp si el navegador lo soporta)
      ],
    })

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    })
  } catch (error: any) {
    console.error('Error al subir archivo:', error)
    const errorMessage = error?.message || error?.error?.message || 'Error desconocido'
    return NextResponse.json(
      { error: `Error: ${errorMessage}` },
      { status: 500 }
    )
  }
}
