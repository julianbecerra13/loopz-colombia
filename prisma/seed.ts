import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de datos...')

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@inears.com' },
    update: {},
    create: {
      email: 'admin@inears.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
    },
  })
  console.log('✅ Usuario admin creado:', admin.email)

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'in-ear-monitors' },
      update: {},
      create: {
        name: 'In-Ear Monitors',
        slug: 'in-ear-monitors',
        description: 'Audífonos in-ear de alta fidelidad para profesionales y audiófilos',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cables-premium' },
      update: {},
      create: {
        name: 'Cables Premium',
        slug: 'cables-premium',
        description: 'Cables de alta calidad para mejorar tu experiencia de audio',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'dacs-amplificadores' },
      update: {},
      create: {
        name: 'DACs & Amplificadores',
        slug: 'dacs-amplificadores',
        description: 'Convertidores y amplificadores portátiles de audio',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accesorios' },
      update: {},
      create: {
        name: 'Accesorios',
        slug: 'accesorios',
        description: 'Tips, estuches y accesorios para tus IEMs',
        order: 4,
      },
    }),
  ])
  console.log('✅ Categorías creadas:', categories.length)

  // Crear productos de ejemplo
  const products = [
    {
      name: 'KZ ZS10 Pro X',
      slug: 'kz-zs10-pro-x',
      description: 'Los KZ ZS10 Pro X son la evolución de los legendarios ZS10 Pro. Con 5 drivers por lado (4 armaduras balanceadas + 1 driver dinámico), ofrecen un sonido detallado y equilibrado perfecto para todo tipo de géneros musicales.\n\nCaracterísticas:\n- Configuración híbrida de 5 drivers\n- Cable desmontable con conector 2-pin\n- Carcasa de resina ergonómica\n- Respuesta de frecuencia: 7Hz - 40kHz',
      shortDesc: 'IEM híbrido 5 drivers - El favorito de los audiófilos',
      price: 45.99,
      comparePrice: 59.99,
      mainImage: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Drivers', value: '4BA + 1DD' },
        { name: 'Impedancia', value: '24Ω' },
        { name: 'Sensibilidad', value: '112dB' },
        { name: 'Respuesta', value: '7Hz - 40kHz' },
        { name: 'Conector', value: '2-pin 0.75mm' },
      ]),
      categoryId: categories[0].id,
      isFeatured: true,
      isNew: true,
    },
    {
      name: 'Moondrop Aria 2',
      slug: 'moondrop-aria-2',
      description: 'Los Moondrop Aria 2 representan la segunda generación del aclamado Aria. Con un driver dinámico de 10mm con diafragma LCP, estos IEMs ofrecen una respuesta de frecuencia extraordinariamente plana y natural.',
      shortDesc: 'Driver dinámico LCP - Sonido neutral y detallado',
      price: 79.99,
      comparePrice: null,
      mainImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Driver', value: '10mm LCP' },
        { name: 'Impedancia', value: '32Ω' },
        { name: 'Sensibilidad', value: '122dB/Vrms' },
        { name: 'Respuesta', value: '10Hz - 36kHz' },
        { name: 'Conector', value: '2-pin 0.78mm' },
      ]),
      categoryId: categories[0].id,
      isFeatured: true,
      isNew: false,
    },
    {
      name: 'Shuoer S12 Pro',
      slug: 'shuoer-s12-pro',
      description: 'Los Shuoer S12 Pro utilizan un driver planar magnético de 14.8mm que ofrece una resolución excepcional y velocidad de respuesta superior a los drivers dinámicos tradicionales.',
      shortDesc: 'Driver planar 14.8mm - Resolución excepcional',
      price: 169.99,
      comparePrice: 199.99,
      mainImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Driver', value: '14.8mm Planar' },
        { name: 'Impedancia', value: '16Ω' },
        { name: 'Sensibilidad', value: '102dB' },
        { name: 'Respuesta', value: '20Hz - 40kHz' },
        { name: 'Conector', value: '2-pin 0.78mm' },
      ]),
      categoryId: categories[0].id,
      isFeatured: true,
      isNew: true,
    },
    {
      name: 'Truthear Zero Red',
      slug: 'truthear-zero-red',
      description: 'Los Truthear Zero Red son una colaboración con el reconocido reviewer Crinacle. Ofrecen una firma sonora neutra-brillante con excelente separación de instrumentos.',
      shortDesc: 'Collab con Crinacle - Firma sonora premium',
      price: 59.99,
      comparePrice: null,
      mainImage: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Drivers', value: '1DD + 1BA' },
        { name: 'Impedancia', value: '20Ω' },
        { name: 'Sensibilidad', value: '108dB' },
        { name: 'Respuesta', value: '20Hz - 20kHz' },
        { name: 'Conector', value: '2-pin 0.78mm' },
      ]),
      categoryId: categories[0].id,
      isFeatured: false,
      isNew: true,
    },
    {
      name: 'Cable OCC 8 Cores',
      slug: 'cable-occ-8-cores',
      description: 'Cable de cobre OCC (Ohno Continuous Cast) de 8 núcleos con alta pureza. Mejora la transmisión de señal y reduce la interferencia.',
      shortDesc: 'Cobre OCC alta pureza - 8 núcleos',
      price: 35.99,
      comparePrice: 45.99,
      mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Material', value: 'Cobre OCC' },
        { name: 'Núcleos', value: '8' },
        { name: 'Conector IEM', value: '2-pin 0.78mm' },
        { name: 'Conector Jack', value: '3.5mm / 4.4mm' },
        { name: 'Longitud', value: '1.2m' },
      ]),
      categoryId: categories[1].id,
      isFeatured: true,
      isNew: false,
    },
    {
      name: 'FiiO KA5 DAC/Amp',
      slug: 'fiio-ka5-dac-amp',
      description: 'El FiiO KA5 es un DAC/Amplificador USB-C portátil con chip dual CS43198. Ofrece potencia suficiente para manejar IEMs de alta impedancia.',
      shortDesc: 'DAC USB-C dual CS43198 - Potencia y portabilidad',
      price: 89.99,
      comparePrice: 109.99,
      mainImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Chip DAC', value: 'Dual CS43198' },
        { name: 'SNR', value: '130dB' },
        { name: 'Potencia', value: '550mW @32Ω' },
        { name: 'Entrada', value: 'USB-C' },
        { name: 'Salida', value: '3.5mm + 4.4mm' },
      ]),
      categoryId: categories[2].id,
      isFeatured: true,
      isNew: true,
    },
    {
      name: 'Moondrop Dawn Pro',
      slug: 'moondrop-dawn-pro',
      description: 'El Moondrop Dawn Pro es un dongle DAC compacto con chip dual CS43131. Perfecto para usar con tu smartphone o laptop.',
      shortDesc: 'Dongle DAC dual CS43131 - Hi-Res portable',
      price: 59.99,
      comparePrice: null,
      mainImage: 'https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Chip DAC', value: 'Dual CS43131' },
        { name: 'SNR', value: '124dB' },
        { name: 'Potencia', value: '230mW @32Ω' },
        { name: 'Entrada', value: 'USB-C / Lightning' },
        { name: 'Salida', value: '3.5mm + 4.4mm' },
      ]),
      categoryId: categories[2].id,
      isFeatured: false,
      isNew: false,
    },
    {
      name: 'Eartips Premium Pack',
      slug: 'eartips-premium-pack',
      description: 'Pack de puntas de silicona premium en 6 tamaños. Mejoran el aislamiento y comodidad de tus IEMs favoritos.',
      shortDesc: 'Pack 6 tamaños - Silicona médica',
      price: 12.99,
      comparePrice: 18.99,
      mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      specs: JSON.stringify([
        { name: 'Material', value: 'Silicona médica' },
        { name: 'Tamaños', value: 'XS, S, MS, M, ML, L' },
        { name: 'Cantidad', value: '3 pares por tamaño' },
      ]),
      categoryId: categories[3].id,
      isFeatured: false,
      isNew: false,
    },
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    })
  }
  console.log('✅ Productos creados:', products.length)

  console.log('\n🎉 Seed completado!')
  console.log('\n📝 Credenciales admin:')
  console.log('   Email: admin@inears.com')
  console.log('   Password: admin123')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
