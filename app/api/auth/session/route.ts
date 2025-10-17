import { NextRequest, NextResponse } from 'next/server'
import { validateCLIToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    const session = await validateCLIToken(token)

    if (!session) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: session.userId,
        email: 'Unknown', // We'll get this from the user table
        name: 'Unknown',
      },
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
        lastUsedAt: session.lastUsedAt,
      },
    })
  } catch (error) {
    console.error('Session validation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
