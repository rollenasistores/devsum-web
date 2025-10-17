import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateUser, createCLISession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('Create CLI session API called')
    const { user } = await request.json()

    if (!user) {
      console.error('Missing user data')
      return NextResponse.json({ error: 'Missing user data' }, { status: 400 })
    }

    console.log('Creating/updating user:', user.email)
    // Create or update user in our database
    const dbUser = await createOrUpdateUser(user)
    console.log('User created/updated:', dbUser.id)

    console.log('Creating CLI session for user:', dbUser.id)
    // Create CLI session
    const session = await createCLISession(dbUser.id)
    console.log('CLI session created:', session.id)

    return NextResponse.json({ 
      token: session.token,
      userId: dbUser.id,
      email: dbUser.email 
    })
  } catch (error) {
    console.error('Create CLI session error:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
