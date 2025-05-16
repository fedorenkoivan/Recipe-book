import express from 'express';
import dotenv from 'dotenv';
import recipesRouter from './routes/recipes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
