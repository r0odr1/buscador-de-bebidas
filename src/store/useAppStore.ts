import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipiesSlice, type RecipiesSliceType } from './recipeSlice'
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export const useAppStore = create<RecipiesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools( (...a) => ({
  ...createRecipiesSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationSlice(...a)
})))