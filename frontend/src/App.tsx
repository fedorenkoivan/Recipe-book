import { Routes, Route } from 'react-router-dom';
import RecipeList from './components/ResipeList';
import RecipeDetail from './components/RecipeDetail';
import MainPage from './components/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/recipe-list" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  );
}

export default App;
