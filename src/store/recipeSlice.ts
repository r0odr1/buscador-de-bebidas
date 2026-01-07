import type { StateCreator } from "zustand"
import { getCategories, getRecipies, getRecipiesById } from "../services/RecipiesService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import type { FavoritesSliceType } from "./favoritesSlice"

export type RecipiesSliceType = {
  categories: Categories
  drinks: Drinks
  selectedRecipe: Recipe,
  modal: boolean,
  fetchCategories: () => Promise<void>
  searchRecipies: (searchFilter: SearchFilter) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
  closeModal: () => void
}

export const createRecipiesSlice : StateCreator<RecipiesSliceType & FavoritesSliceType, [], [], RecipiesSliceType> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  selectedRecipe: {} as Recipe,
  modal: false ,

  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories
    })
  },

  searchRecipies: async (filters) => {
    const drinks = await getRecipies(filters)
    set({
      drinks
    })
    
  },

  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipiesById(id)
    set({
      selectedRecipe,
      modal: true
    })
  },

  closeModal: async () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe
    })
  }
})