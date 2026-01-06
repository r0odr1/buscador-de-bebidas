import type { StateCreator } from "zustand"
import { getCategories, getRecipies } from "../services/RecipiesService"
import type { Categories, SearchFilter } from "../types"

export type RecipiesSliceType = {
  categories: Categories
  fetchCategories: () => Promise<void>
  searchRecipies: (searchFilter: SearchFilter) => Promise<void>
}

export const createRecipiesSlice : StateCreator<RecipiesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories
    })
  },

  searchRecipies: async (filters) => {
    await getRecipies(filters)
  }
})