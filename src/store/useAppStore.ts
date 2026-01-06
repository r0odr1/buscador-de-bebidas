import { create } from 'zustand'
import { createRecipiesSlice } from './recipeSlice'

export const useAppStore = create( (...a) => ({
  ...createRecipiesSlice(...a)
}))