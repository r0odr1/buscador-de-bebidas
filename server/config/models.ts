export const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-4b-it:free'
] as const

export type AIModel = typeof MODELS[number]