import type { StateCreator } from "zustand"

type Category = {}

export type RecipiesSliceType = {
  categories: Category[]
}

export const createRecipiesSlice : StateCreator<RecipiesSliceType> = () => ({
  categories: []
})