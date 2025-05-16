import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const API_BASE_URL = process.env.API_BASE_URL;

const fetch = (...args: Parameters<typeof import('node-fetch').default>) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.get('/recipes', async (req, res) => {
  try {
    const search = req.query.search || '';
    const response = await fetch(`${API_BASE_URL}/search.php?s=`);
    const data: any = await response.json();

    res.json(data.meals || []);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

export default router;
