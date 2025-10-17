import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { createOrUpdateUser, createCLISession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cliPort = searchParams.get('cli_port')
    const code = searchParams.get('code')
    
    // Check if we have a code parameter (PKCE flow)
    if (code) {
      // Create Supabase client
      const supabase = createServerClient()

      // Exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error || !data.session) {
        console.error('Auth error:', error)
        return NextResponse.json({ error: 'Authentication failed' }, { status: 400 })
      }

      const supabaseUser = data.session.user

      // Create or update user in our database
      const user = await createOrUpdateUser(supabaseUser)

      // Create CLI session
      const session = await createCLISession(user.id)

      // If this is a CLI authentication request, redirect to localhost
      if (cliPort) {
        const redirectUrl = `http://localhost:${cliPort}/callback?token=${session.token}&success=true`
        return NextResponse.redirect(redirectUrl)
      }

      // For web authentication, redirect to success page
      return NextResponse.redirect('/auth/success?token=' + session.token)
    }

    // If no code, redirect to login page
    return NextResponse.redirect('/auth/login' + (cliPort ? `?cli_port=${cliPort}` : ''))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
