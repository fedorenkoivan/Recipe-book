import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import "../styles/RecipeList.css"

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');
  const ingredient = searchParams.get('ingredient');

  const getTitle = () => {
    if (search) return `Recipes matching: "${search}"`;
    if (ingredient) return `Recipes with ingredient: "${ingredient}"`;
    return 'All Recipes';
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/recipes';
        if (search) url += `?search=${encodeURIComponent(search)}`;
        else if (ingredient) url += `?ingredient=${encodeURIComponent(ingredient)}`;

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
  }, [search, ingredient]);

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
