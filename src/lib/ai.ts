import { createOpenRouter } from '@openrouter/ai-sdk-provider'

export const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY
})

// Añade esto temporalmente en AIServices.ts
console.log('API Key cargada:', !!import.meta.env.VITE_OPENROUTER_KEY)
console.log('Primeros 10 chars:', import.meta.env.VITE_OPENROUTER_KEY?.substring(0, 10))