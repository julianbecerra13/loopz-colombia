# Loopz Colombia

Tienda online de audio premium especializada en In-Ear Monitors (IEMs), cables, DACs y accesorios para audiófilos.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-5-2d3748)

## Características

- **Landing Page** - Diseño moderno con efectos glassmorphism y neon
- **Catálogo de Productos** - Filtros por categoría, búsqueda y paginación
- **Panel Administrativo** - Gestión completa de productos y categorías
- **Autenticación** - Sistema de login seguro con NextAuth
- **Animaciones** - Transiciones suaves con Framer Motion
- **Responsive** - Adaptado para móviles, tablets y desktop
- **SEO Optimizado** - Metadata y Open Graph configurados

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| Next.js 16 | Framework React con App Router |
| TypeScript | Tipado estático |
| Tailwind CSS 4 | Estilos y diseño |
| Prisma | ORM para base de datos |
| PostgreSQL | Base de datos (Neon) |
| NextAuth | Autenticación |
| Framer Motion | Animaciones |
| Lucide React | Iconos |

## Estructura del Proyecto

```
src/
├── app/
│   ├── (admin)/          # Panel administrativo
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── productos/
│   │       └── categorias/
│   ├── (public)/         # Páginas públicas
│   │   ├── page.tsx      # Landing
│   │   ├── catalogo/
│   │   └── producto/
│   └── api/              # API Routes
│       ├── auth/
│       ├── products/
│       └── categories/
├── components/
│   ├── admin/            # Componentes del admin
│   ├── catalog/          # Componentes del catálogo
│   ├── landing/          # Secciones de la landing
│   ├── shared/           # Header, Footer
│   └── ui/               # Componentes base (Button, Card, etc.)
├── core/
│   └── infrastructure/
│       ├── database/     # Configuración Prisma
│       └── repositories/ # Acceso a datos
└── lib/
    └── utils.ts          # Utilidades
```

## Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/julianbecerra13/loopz-colombia.git
cd loopz-colombia
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` con:
```env
DATABASE_URL="tu-url-de-base-de-datos"
NEXTAUTH_SECRET="tu-clave-secreta"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Inicializar base de datos**
```bash
npx prisma db push
npm run db:seed
```

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run start` | Inicia servidor de producción |
| `npm run db:seed` | Pobla la base de datos con datos de ejemplo |
| `npm run db:studio` | Abre Prisma Studio |

## Despliegue

El proyecto está configurado para desplegarse en:
- **Vercel** - Hosting de la aplicación
- **Neon** - Base de datos PostgreSQL

### Variables de Entorno en Producción

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://tu-dominio.vercel.app
```

## Diseño y Branding

### Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Verde Neon | `#00FF88` | Acentos, CTAs |
| Azul Oscuro | `#0A1628` | Fondo principal |
| Azul Medio | `#1E3A5F` | Elementos secundarios |

### Efectos Visuales

- **Glassmorphism** - Fondos translúcidos con blur
- **Neon Glow** - Sombras brillantes en elementos verdes
- **Animaciones Scroll** - Aparición progresiva de secciones

## Rutas Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page |
| `/catalogo` | Catálogo de productos |
| `/producto/[slug]` | Detalle de producto |
| `/admin/login` | Login administrativo |
| `/admin/dashboard` | Panel de control |
| `/admin/productos` | Gestión de productos |
| `/admin/categorias` | Gestión de categorías |

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Lista productos |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/[id]` | Actualizar producto |
| DELETE | `/api/products/[id]` | Eliminar producto |
| GET | `/api/categories` | Lista categorías |
| POST | `/api/categories` | Crear categoría |
| PUT | `/api/categories/[id]` | Actualizar categoría |
| DELETE | `/api/categories/[id]` | Eliminar categoría |

## Licencia

Proyecto privado - Todos los derechos reservados.

---

Desarrollado por **Julian Rodriguez** - [becerrarodriguezjulian@gmail.com](mailto:becerrarodriguezjulian@gmail.com)
