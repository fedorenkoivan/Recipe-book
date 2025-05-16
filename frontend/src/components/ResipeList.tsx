import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import "../styles/RecipeList.css";
import type { Recipe } from '../types/types';

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const ingredient = searchParams.get('ingredient');
  const area = searchParams.get('area');
  const category = searchParams.get('category');

  const getTitle = () => {
    if (ingredient) return `Recipes with ${ingredient}`;
    if (area) return `${area} Cuisine`;
    if (category) return `${category} Recipes`;
    return 'All Recipes';
  };

  const goBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = 'http://localhost:5000/recipes';
        const params = new URLSearchParams();

        if (ingredient) params.set('ingredient', ingredient);
        if (area) params.set('area', area);
        if (category) params.set('category', category);

        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }

        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data || data.length === 0) {
          setRecipes([]);
          setError('No recipes found with the selected filter.');
        } else {
          setRecipes(data);
        }
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to fetch recipes. Please try again later.');
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredient, area, category]);

  return (
    <div className="recipe-container">
      <div className="recipe-list-header">
        <button className="back-button" onClick={goBack}>
          ← Back
        </button>
        <h1 className="recipe-title">{getTitle()}</h1>
      </div>

      {loading ? (
        <div className="recipe-loading">
          <div className="loading-spinner"></div>
          <p>Loading recipes...</p>
        </div>
      ) : error ? (
        <div className="recipe-error">
          <p>{error}</p>
          <button className="try-again-button" onClick={goBack}>
            Return to Homepage
          </button>
        </div>
      ) : (
        <>
          <p className="recipe-count">{recipes.length} recipes found</p>
          <ul className="recipe-list">
            {recipes.map(recipe => (
              <li key={recipe.idMeal} className="recipe-item">
                <Link to={`/recipe/${recipe.idMeal}`} className="recipe-link">
                  <div className="recipe-image-container">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="recipe-image"
                    />
                  </div>
                  <div className="recipe-info">
                    <h3 className="recipe-name">{recipe.strMeal}</h3>
                    {recipe.strCategory && <p className="recipe-category">{recipe.strCategory}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default RecipeList;