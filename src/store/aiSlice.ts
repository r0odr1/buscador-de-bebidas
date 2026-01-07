import type {StateCreator } from 'zustand'
import AIServices from '../services/AIServices'

export type AISlice = {
  recipe: string
  generateRecipe: (promp: string) => Promise<void>
}

export const createAISlice : StateCreator<AISlice, [], [], AISlice>= () => ({
  recipe: '',
  generateRecipe: async(prompt) => {
    const data = await AIServices.generateRecipe(prompt)
  }
})