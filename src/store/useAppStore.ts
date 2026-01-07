import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipiesSlice, type RecipiesSliceType } from './recipeSlice'
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'
import { createAISlice, type AISlice } from './aiSlice'

export const useAppStore = create<RecipiesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools( (...a) => ({
  ...createRecipiesSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationSlice(...a),
  ...createAISlice(...a)
})))