import api from "../lib/axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipies-schema";
import type { SearchFilter } from "../types";

export async function getCategories() {
  const url = '/list.php?c=list'
  const { data } = await api(url)
  // Validar con ZOD
  const result = CategoriesAPIResponseSchema.safeParse(data)
  if(result.success) {
      return result.data
  }
}

export async function getRecipies(filters: SearchFilter) {
  const url = `/filter.php?c=${filters.category}&i=${filters.ingredient}`
  const { data } = await api(url)
  const result = DrinksAPIResponse.safeParse(data)
  if(result.success) {
    return result.data
  }
}
export async function getRecipiesById(id: SearchFilter['ingredient']) {
  const url = `/lookup.php?i=${id}`
  const { data } = await api(url)
  // console.log(data.drinks[0])
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
  // console.log(result)
  if(result.success) {
    return result.data
  }
}
