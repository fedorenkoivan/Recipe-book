import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const API_BASE_URL = process.env.API_BASE_URL;

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions?: string;
  strMealThumb: string;
}

interface MealDBResponse {
  meals: Meal[] | null;
}

const fetch = (...args: Parameters<typeof import('node-fetch').default>) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.get('/recipes', async (req: Request, res: Response) => {
  const { ingredient, area, category } = req.query as {
    ingredient?: string;
    area?: string;
    category?: string;
  };

  let url = '';

  if (ingredient) {
    url = `${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`;
  } else if (area) {
    url = `${API_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`;
  } else if (category) {
    url = `${API_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
  } else {
    url = `${API_BASE_URL}/search.php?s=`;
  }

  try {
    const response = await fetch(url);
    const data = (await response.json()) as MealDBResponse;
    res.json(data.meals ?? []);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});


export default router;
