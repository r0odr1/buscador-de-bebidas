import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipies-schema";
import type { Drink, SearchFilter } from "../types";

export async function getCategories() {

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
  const  { data } = await axios(url)
  const result = CategoriesAPIResponseSchema.safeParse(data)

  if(result.success) {
    return result.data
  }
}

export async function getRecipies(filters : SearchFilter) {
  const url = new URL('https://www.thecocktaildb.com/api/json/v1/1/filter.php');
  const params = new URLSearchParams();

  if (filters.category) {
    params.append('c', filters.category);
  } else if (filters.ingredient) {
    params.append('i', filters.ingredient);
  }

  url.search = params.toString();

  const { data } = await axios(url.toString())
  const result = DrinksAPIResponse.safeParse(data)

  if(result.success) {
    return result.data
  }
}

export async function getRecipiesById(id : Drink['idDrink']) {
  
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const  { data } = await axios(url)
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
  
  if(result.success) {
    return result.data
  }
}