import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ResipeList from './components/ResipeList';
import RecipeByIngredient from './components/RecipeByIngredient';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/recipe-list" element={<ResipeList />} />
      <Route path="/recipe:ingredient" element={<RecipeByIngredient />} />
    </Routes>
  );
}

export default App;
