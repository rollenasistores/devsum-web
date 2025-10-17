'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const cliPort = searchParams.get('cli_port')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [user, setUser] = useState<any>(null)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Check if we have URL fragments (OAuth callback)
    const hash = window.location.hash.substring(1)
    if (hash) {
      handleOAuthCallback(hash)
    } else {
      // Check if user is already authenticated
      checkAuthStatus()
    }
  }, [])

  const handleOAuthCallback = async (hash: string) => {
    try {
      const fragmentParams = new URLSearchParams(hash)
      const accessToken = fragmentParams.get('access_token')
      const refreshToken = fragmentParams.get('refresh_token')
      const expiresAt = fragmentParams.get('expires_at')

      if (accessToken) {
        // Set the session in Supabase
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        })

        if (error) {
          console.error('Session error:', error)
          setStatus('error')
          return
        }

        if (data.session?.user) {
          setUser(data.session.user)
          setStatus('success')
          
          // If this is a CLI request, redirect to CLI
          if (cliPort) {
            // Create CLI session by calling our API
            await createCLISession(data.session.user)
            startCountdown()
          }
        }
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('OAuth callback error:', error)
      setStatus('error')
    }
  }

  const createCLISession = async (user: any) => {
    try {
      console.log('Creating CLI session for user:', user.email)
      
      const response = await fetch('/api/auth/create-cli-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', response.status, errorText)
        throw new Error(`Failed to create CLI session: ${response.status} ${errorText}`)
      }

      const { token } = await response.json()
      console.log('CLI session created, token:', token ? 'present' : 'missing')
      
      // Redirect to CLI
      if (cliPort) {
        const redirectUrl = `http://localhost:${cliPort}/callback?token=${token}&success=true`
        console.log('Redirecting to CLI:', redirectUrl)
        window.location.href = redirectUrl
      }
    } catch (error) {
      console.error('Failed to create CLI session:', error)
      setStatus('error')
      // Still try to redirect to CLI with error
      if (cliPort) {
        window.location.href = `http://localhost:${cliPort}/callback?success=false&error=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`
      }
    }
  }

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        setStatus('success')
        
        // Start countdown if this is a CLI request
        if (cliPort) {
          startCountdown()
        }
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setStatus('error')
    }
  }

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          // Redirect to CLI
          window.location.href = `http://localhost:${cliPort}/callback?success=true`
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleLogin = async () => {
    try {
      setStatus('loading')
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/login${cliPort ? `?cli_port=${cliPort}` : ''}`,
        },
      })

      if (error) {
        console.error('Login error:', error)
        setStatus('error')
      }
    } catch (error) {
      console.error('Login error:', error)
      setStatus('error')
    }
  }

  const handleReturnToCLI = () => {
    if (cliPort) {
      window.location.href = `http://localhost:${cliPort}/callback?success=true`
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">Checking authentication status...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>Authentication Required</span>
            </CardTitle>
            <CardDescription>
              Please sign in to use DevSum CLI with cloud AI features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleLogin} className="w-full">
              Sign in with Google
            </Button>
            {cliPort && (
              <Button variant="outline" onClick={handleReturnToCLI} className="w-full">
                Return to CLI (Skip Authentication)
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Authentication Successful</span>
          </CardTitle>
          <CardDescription>
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cliPort ? (
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Redirecting to CLI in {countdown} seconds...
              </p>
              <Button onClick={handleReturnToCLI} className="w-full">
                Return to CLI Now
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                You can now use DevSum CLI with cloud AI features.
              </p>
              <Button onClick={() => window.close()} className="w-full">
                Close Window
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
