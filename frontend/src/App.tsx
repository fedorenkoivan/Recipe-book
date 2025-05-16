import { useEffect, useState } from 'react';
import './App.css';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
      })
      .catch(error => console.error('Error fetching recipes:', error))
      .finally(() => {
        setLoading(false)
      });
  }, []);

  return (
    <div>
      <h1>Recipe Book</h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.idMeal}>
              <h3>{recipe.strMeal}</h3>
              <p>Category: {recipe.strCategory}</p>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} width="150" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
