import type {StateCreator } from 'zustand'
import AIServices from '../services/AIServices'

export type AISlice = {
  recipe: string
  isGenerating: boolean
  activeModel: string | null
  generateRecipe: (promp: string) => Promise<void>
}

export const createAISlice : StateCreator<AISlice>= (set) => ({
  recipe: '',
  isGenerating: false,
  activeModel: null,

  generateRecipe: async (prompt) => {
    set({
      recipe: '',
      isGenerating: true,
      activeModel: null
    })

    try {
      const { stream, modelName } = await AIServices.generateRecipe(prompt)

      set({ activeModel: modelName })

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