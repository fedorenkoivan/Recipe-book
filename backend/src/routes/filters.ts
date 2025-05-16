import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

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

const router = Router();
const API_BASE_URL = process.env.API_BASE_URL;

const fetch = (...args: Parameters<typeof import('node-fetch').default>) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.get('/areas', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
    const data = (await response.json()) as MealDBResponse;
    res.json(data.meals ?? []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load areas' });
  }
});

router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
    const data = (await response.json()) as MealDBResponse;
    res.json(data.meals ?? []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

export default router;
