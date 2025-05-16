type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions?: string;
  strMealThumb: string;
}

export type MealDBResponse = {
  meals: Meal[] | null;
}