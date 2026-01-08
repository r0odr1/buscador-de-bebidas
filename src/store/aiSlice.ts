import type {StateCreator } from 'zustand'
import AIServices from '../services/AIServices'

export type AISlice = {
  recipe: string
  isGenerating: boolean
  generateRecipe: (promp: string) => Promise<void>
}

export const createAISlice : StateCreator<AISlice>= (set) => ({
  recipe: '',
  isGenerating: false,

  generateRecipe: async (prompt) => {
    set({
      recipe: '',
      isGenerating: true
    })

    try {
      const stream = await AIServices.generateRecipe(prompt)

      for await (const textPart of stream) {
        set((state) => ({
          recipe: state.recipe + textPart
        }))
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ recipe: error.message })
      } else {
        set({ recipe: 'Error generando receta' })
      }
    } finally {
      set({ isGenerating: false })
    }
  }
})