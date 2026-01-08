import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { streamText } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { getModels } from './utils/selectModel'

const app = express()

app.use(cors())
app.use(express.json())

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error('Missing OPENROUTER_API_KEY')
}

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
})

app.post('/api/generate-recipe', async (req, res) => {
  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  for (const model of getModels()) {
    try {
      console.log(`🤖 Trying model: ${model}`)

      const result = streamText({
        model: openrouter(model),
        prompt
      })

      await result.textStream.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk)
          },
          close() {
            res.end()
          }
        })
      )

      // 👈 si llegó aquí, ya respondió → no seguimos
      return
    } catch (error) {
      console.warn(`❌ Model failed: ${model}`, error)
    }
  }

  // 👇 si TODOS fallaron
  if (!res.headersSent) {
    res.status(429).json({
      error: 'AI is busy, please try again in a moment'
    })
  }
})

app.listen(3001, () => {
  console.log('🚀 API running on http://localhost:3001')
})