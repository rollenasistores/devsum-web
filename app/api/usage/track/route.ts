import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Handle unsupported methods
export async function GET(request: NextRequest) {
  console.log('🔍 [API DEBUG] GET request received on /api/usage/track - method not allowed')
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts POST requests.' },
    { status: 405 }
  )
}

export async function POST(request: NextRequest) {
  console.log('🔍 [API DEBUG] Usage track endpoint called')
  console.log('🔍 [API DEBUG] Request method:', request.method)
  console.log('🔍 [API DEBUG] Request URL:', request.url)
  console.log('🔍 [API DEBUG] Request headers:', Object.fromEntries(request.headers.entries()))
  
  try {
    const body = await request.json()
    console.log('🔍 [API DEBUG] Request body keys:', Object.keys(body))
    
    const { commandType, userId, success = true, metadata } = body

    // Validate required fields
    if (!commandType || !['commit', 'report', 'analyze'].includes(commandType)) {
      console.log('🔍 [API DEBUG] Invalid command type:', commandType)
      return NextResponse.json(
        { error: 'Invalid command type' },
        { status: 400 }
      )
    }

    // Extract additional analytics data
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || null
    const acceptLanguage = request.headers.get('accept-language') || null
    const timezone = request.headers.get('x-timezone') || null
    
    // Enhanced metadata with analytics data
    const enhancedMetadata = {
      ...metadata,
      analytics: {
        ip: ip,
        userAgent: userAgent,
        referer: referer,
        acceptLanguage: acceptLanguage,
        timezone: timezone,
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    }

    // Create usage record
    const usageRecord = await prisma.cliUsageStats.create({
      data: {
        commandType,
        userId: userId || null,
        success,
        metadata: enhancedMetadata
      }
    })

    console.log('🔍 [API DEBUG] Usage record created successfully:', usageRecord.id)
    
    return NextResponse.json({ 
      success: true, 
      id: usageRecord.id 
    })
  } catch (error) {
    console.error('🔍 [API DEBUG] Error tracking usage:', error)
    return NextResponse.json(
      { error: 'Failed to track usage', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
