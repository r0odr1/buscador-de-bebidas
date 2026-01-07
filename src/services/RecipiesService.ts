import api from "../lib/axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipies-schema";
import type { Drink, SearchFilter } from "../types";

export async function getCategories() {

  const url = '/list.php?c=list'
  const  { data } = await api(url)
  //validar con ZOD
  const result = CategoriesAPIResponseSchema.safeParse(data)

  if(result.success) {
    return result.data
  }
}

export async function getRecipies(filters : SearchFilter) {
  const params = new URLSearchParams();
  if (filters.category) params.append('c', filters.category);
  else if (filters.ingredient) params.append('i', filters.ingredient);

  const { data } = await api(`/filter.php?${params.toString()}`);
  const result = DrinksAPIResponse.safeParse(data);

  if (!result.success) throw new Error("Error al buscar recetas");
  return result.data;
}

export async function getRecipiesById(id : Drink['idDrink']) {

  const url = `/lookup.php?i=${id}`;
  const  { data } = await api(url)
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])

  if(result.success) {
    return result.data
  }
}