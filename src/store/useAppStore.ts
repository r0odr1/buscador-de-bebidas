import { create } from 'zustand'
import { createRecipiesSlice, type RecipiesSliceType } from './recipeSlice'

export const useAppStore = create<RecipiesSliceType>( (...a) => ({
  ...createRecipiesSlice(...a)
}))