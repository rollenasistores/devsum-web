import { NextRequest, NextResponse } from 'next/server'
import { validateCLIToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

interface ProxyRequest {
  provider: 'gemini' | 'claude' | 'openai'
  operation: 'generateReport' | 'generateCommit' | 'generateBranchName' | 'generatePullRequestTitle'
  prompt: string
  model?: string
  options?: any
}

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const session = await validateCLIToken(token)

    if (!session) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    const body: ProxyRequest = await request.json()
    const { provider, operation, prompt, model, options } = body

    if (!provider || !operation || !prompt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let result: any
    let tokensUsed = 0
    let cost = 0

    try {
      // Route to appropriate AI provider
      switch (provider) {
        case 'gemini':
          result = await handleGeminiRequest(prompt, model, operation, options)
          tokensUsed = estimateTokens(prompt, result)
          cost = calculateCost('gemini', tokensUsed)
          break
        case 'claude':
          result = await handleClaudeRequest(prompt, model, operation, options)
          tokensUsed = estimateTokens(prompt, result)
          cost = calculateCost('claude', tokensUsed)
          break
        case 'openai':
          result = await handleOpenAIRequest(prompt, model, operation, options)
          tokensUsed = estimateTokens(prompt, result)
          cost = calculateCost('openai', tokensUsed)
          break
        default:
          return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 })
      }

      // Track usage
      await prisma.apiUsage.create({
        data: {
          userId: session.userId,
          provider,
          operation,
          tokensUsed,
          cost,
          success: true,
        },
      })

      return NextResponse.json({ result, tokensUsed, cost })
    } catch (aiError) {
      // Track failed usage
      await prisma.apiUsage.create({
        data: {
          userId: session.userId,
          provider,
          operation,
          tokensUsed: 0,
          cost: 0,
          success: false,
          error: aiError instanceof Error ? aiError.message : 'Unknown error',
        },
      })

      throw aiError
    }
  } catch (error) {
    console.error('AI proxy error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleGeminiRequest(prompt: string, model: string, operation: string, options: any) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Gemini API key not configured')
  }

  const client = new GoogleGenerativeAI(apiKey)
  const genModel = client.getGenerativeModel({ model: model || 'gemini-2.0-flash' })
  
  const result = await genModel.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  return parseAIResponse(text, operation)
}

async function handleClaudeRequest(prompt: string, model: string, operation: string, options: any) {
  const apiKey = process.env.CLAUDE_API_KEY
  if (!apiKey) {
    throw new Error('Claude API key not configured')
  }

  const client = new Anthropic({ apiKey })
  const response = await client.messages.create({
    model: model || 'claude-3-5-sonnet-20241022',
    max_tokens: options?.maxTokens || 4000,
    temperature: options?.temperature || 0.7,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content
    .filter(block => block.type === 'text')
    .map(block => (block as any).text)
    .join('\n')

  return parseAIResponse(text, operation)
}

async function handleOpenAIRequest(prompt: string, model: string, operation: string, options: any) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const client = new OpenAI({ apiKey })
  const response = await client.chat.completions.create({
    model: model || 'gpt-4',
    max_tokens: options?.maxTokens || 4000,
    temperature: options?.temperature || 0.7,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.choices[0]?.message?.content || ''
  return parseAIResponse(text, operation)
}

function parseAIResponse(text: string, operation: string): any {
  // Basic parsing based on operation type
  switch (operation) {
    case 'generateReport':
      return parseReportResponse(text)
    case 'generateCommit':
      return parseCommitResponse(text)
    case 'generateBranchName':
      return parseBranchNameResponse(text)
    case 'generatePullRequestTitle':
      return parsePullRequestTitleResponse(text)
    default:
      return text
  }
}

function parseReportResponse(text: string) {
  const lines = text.split('\n')
  const accomplishments: string[] = []
  let inAccomplishments = false
  let summary = ''

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine.toLowerCase().includes('summary:')) {
      inAccomplishments = false
      continue
    }

    if (trimmedLine.toLowerCase().includes('accomplishments:') || trimmedLine.toLowerCase().includes('highlights:')) {
      inAccomplishments = true
      continue
    }

    if (inAccomplishments && trimmedLine.startsWith('-')) {
      accomplishments.push(trimmedLine.substring(1).trim())
    } else if (!inAccomplishments && trimmedLine && !trimmedLine.startsWith('**')) {
      summary += trimmedLine + ' '
    }
  }

  return {
    summary: summary.trim() || 'Work completed during the specified period.',
    accomplishments: accomplishments.length > 0 ? accomplishments : ['Various development tasks completed'],
  }
}

function parseCommitResponse(text: string) {
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)

  const cleanedLines = lines.map(line =>
    line.replace(/^(commit message:|message:|commit:)/i, '').trim()
  )

  const bulletLines = cleanedLines.filter(
    line => line.startsWith('-') || line.startsWith('*') || line.startsWith('•')
  )

  const messageLines = bulletLines.length > 0 ? bulletLines : cleanedLines
  let message = messageLines.join('\n').trim()

  if (message.startsWith('"') && message.endsWith('"')) {
    message = message.slice(1, -1)
  }
  if (message.startsWith("'") && message.endsWith("'")) {
    message = message.slice(1, -1)
  }

  return message || '- Update files'
}

function parseBranchNameResponse(text: string) {
  let branchName = text.trim()
  branchName = branchName.replace(/^(branch name:|branch:|name:)/i, '').trim()

  if (branchName.startsWith('"') && branchName.endsWith('"')) {
    branchName = branchName.slice(1, -1)
  }
  if (branchName.startsWith("'") && branchName.endsWith("'")) {
    branchName = branchName.slice(1, -1)
  }

  branchName = branchName
    .toLowerCase()
    .replace(/[^a-z0-9\/\-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (!branchName || branchName.length < 3) {
    branchName = 'feature/auto-generated-branch'
  }

  if (!branchName.includes('/')) {
    branchName = `feature/${branchName}`
  }

  return branchName
}

function parsePullRequestTitleResponse(text: string) {
  let title = text.trim()
  title = title.replace(/^(pull request title:|pr title:|title:)/i, '').trim()

  if (title.startsWith('"') && title.endsWith('"')) {
    title = title.slice(1, -1)
  }
  if (title.startsWith("'") && title.endsWith("'")) {
    title = title.slice(1, -1)
  }

  title = title.split('\n')[0]?.trim() || title

  if (!title || title.length < 3) {
    title = 'Update files'
  }

  if (title.length > 60) {
    title = title.substring(0, 57) + '...'
  }

  return title
}

function estimateTokens(input: string, output: string): number {
  // Rough estimation: 1 token ≈ 4 characters
  return Math.ceil((input.length + output.length) / 4)
}

function calculateCost(provider: string, tokens: number): number {
  // Rough cost estimation (per 1K tokens)
  const costs = {
    gemini: 0.0005,
    claude: 0.003,
    openai: 0.03,
  }
  return (tokens / 1000) * (costs[provider as keyof typeof costs] || 0)
}
