import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import "../styles/RecipeList.css"
import type { Recipe } from '../types/types';

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const ingredient = searchParams.get('ingredient');
  const area = searchParams.get('area');
  const category = searchParams.get('category');

  const getTitle = () => {
    if (ingredient) return `Recipes with ingredient: "${ingredient}"`;
    if (area) return `Recipes from: "${area}"`;
    if (category) return `Recipes in category: "${category}"`;
    return 'All Recipes';
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/recipes';
        const params = new URLSearchParams();

        if (ingredient) params.set('ingredient', ingredient);
        if (area) params.set('area', area);
        if (category) params.set('category', category);

        url += `?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredient]);

  return (
  <div className="recipe-container">
    <h1 className="recipe-title">{getTitle()}</h1>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <ul className="recipe-list">
        {recipes.map(recipe => (
          <li key={recipe.idMeal} className="recipe-item">
            <Link to={`/recipe/${recipe.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-image"
              />
              <div className="recipe-name">{recipe.strMeal}</div>
              {recipe.strCategory && <div className="recipe-category">{recipe.strCategory}</div>}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default RecipeList;
