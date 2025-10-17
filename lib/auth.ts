import { createServerClient } from './supabase'
import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export interface AuthSession {
  id: string
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
  lastUsedAt: Date
}

export interface User {
  id: string
  email: string
  supabaseId: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Generate a secure random token for CLI authentication
 */
export function generateCLIToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Create or update user from Supabase auth data
 */
export async function createOrUpdateUser(supabaseUser: any): Promise<User> {
  console.log('createOrUpdateUser called with:', supabaseUser.email)
  console.log('Prisma client:', prisma ? 'exists' : 'undefined')
  
  const userData = {
    email: supabaseUser.email,
    supabaseId: supabaseUser.id,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
  }

  console.log('User data:', userData)

  try {
    // Upsert user
    const user = await prisma.user.upsert({
      where: { supabaseId: supabaseUser.id },
      update: {
        email: userData.email,
        name: userData.name,
        updatedAt: new Date(),
      },
      create: {
        email: userData.email,
        supabaseId: userData.supabaseId,
        name: userData.name,
      },
    })

    console.log('User created/updated:', user.id)
    return user as User
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error)
    throw error
  }
}

/**
 * Create CLI auth session
 */
export async function createCLISession(userId: string): Promise<AuthSession> {
  const token = generateCLIToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  const session = await prisma.authSession.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  return session
}

/**
 * Validate CLI auth token
 */
export async function validateCLIToken(token: string): Promise<AuthSession | null> {
  const session = await prisma.authSession.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session) {
    return null
  }

  // Check if token is expired
  if (session.expiresAt < new Date()) {
    // Clean up expired session
    await prisma.authSession.delete({ where: { id: session.id } })
    return null
  }

  // Update last used timestamp
  await prisma.authSession.update({
    where: { id: session.id },
    data: { lastUsedAt: new Date() },
  })

  return session
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions(): Promise<void> {
  await prisma.authSession.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  })
}
