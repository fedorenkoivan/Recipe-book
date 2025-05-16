import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import { MealDBResponse } from '../types/types';

dotenv.config();

const router = Router();

const API_BASE_URL = process.env.API_BASE_URL;

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
router.get('/recipes/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
    const data = await response.json() as MealDBResponse;
    
    if (!data.meals || data.meals.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json(data.meals[0]);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

export default router;
