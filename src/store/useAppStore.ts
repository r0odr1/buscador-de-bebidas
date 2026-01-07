import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipiesSlice, type RecipiesSliceType } from './recipeSlice'
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'

export const useAppStore = create<RecipiesSliceType & FavoritesSliceType>()(devtools( (...a) => ({
  ...createRecipiesSlice(...a),
  ...createFavoritesSlice(...a)
})))