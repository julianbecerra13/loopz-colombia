import { prisma } from '../database/prisma'
import bcrypt from 'bcryptjs'
import type { User } from '@/core/domain/types'

export const UserRepository = {
  // Buscar usuario por email
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Promise<User | null>
  },

  // Verificar credenciales
  async verifyCredentials(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return null

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },

  // Crear usuario admin
  async createAdmin(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'admin',
      },
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },

  // Actualizar contraseña
  async updatePassword(id: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    })
  },
}
