import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

const MODELS = [
  { name: 'meta-llama/llama-3.3-70b-instruct:free', priority: 1 },
  { name: 'google/gemini-2.5-pro-exp-03-25:free', priority: 2 },
  { name: 'deepseek/deepseek-chat-v3-0324:free', priority: 3 },
  { name: 'google/gemma-3-4b-it:free', priority: 4 }
]

export default {
  async generateRecipe(prompt: string) {
    let lastError: Error | null = null

    // Intenta cada modelo secuencialmente
    for (const model of MODELS) {
      try {
        const result = streamText({
          model: openrouter(model.name),
          prompt
        })

        return {
          stream: result.textStream,
          modelName: model.name
        }

      } catch (error) {
        lastError = error as Error
        console.warn(`❌ ${model.name} falló:`, error)

        // Si el error es de "rate limit" o "service unavailable", continúa
        if (this.isRetryableError(error)) {
          continue
        }

        // Si es otro error (ej. prompt inválido), detente
        throw error
      }
    }

    // Si todos fallan, lanza el último error
    throw lastError || new Error('Todos los modelos de IA fallaron')
  },

  // Detecta errores que permiten reintento
  isRetryableError(error: unknown): boolean {
    const msg = error?.toString().toLowerCase() || ''
    return (
      msg.includes('rate limit') ||
      msg.includes('service unavailable') ||
      msg.includes('timeout') ||
      msg.includes('503') ||
      msg.includes('429')
    )
  }
}