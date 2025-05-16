import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import recipesRouter from './routes/recipes';
import router from './routes/filters';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/', recipesRouter);
app.use('/filters', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
