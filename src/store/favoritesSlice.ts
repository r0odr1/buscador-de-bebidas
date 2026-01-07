import type { StateCreator } from 'zustand'
import type { Recipe } from '../types'
import { createRecipiesSlice, type RecipiesSliceType } from './recipeSlice'

export type FavoritesSliceType = {
  favorites: Recipe[]
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExists: (id: Recipe['idDrink']) => boolean
  loadFromStorage: () => void

}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipiesSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if(get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
      }))
    } else {
      set((state) => ({
        favorites: [ ...state.favorites, recipe]
      }))
    }
    createRecipiesSlice(set, get, api).closeModal()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },

  favoriteExists: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },

  loadFromStorage: () => {
    const storeFavorites = localStorage.getItem('favorites')
    if(storeFavorites) {
      set({
        favorites: JSON.parse(storeFavorites)
      })
    }
  }
})