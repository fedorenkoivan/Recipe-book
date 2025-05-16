import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Spaghetti Bolognese' },
    { id: 2, name: 'Chicken Curry' }
  ]);
});

export default router;