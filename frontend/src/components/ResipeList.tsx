import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('search') || '';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/recipes?search=${filter}`);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('Error loading recipes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [filter]);

  return (
    <div>
      <h1>{filter ? `Recipes matching: ${filter}` : 'All Recipes'}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recipes.map((recipe) => (
            <li key={recipe.idMeal} style={{ marginBottom: '20px' }}>
              <Link to={`/recipe/${recipe.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>{recipe.strMeal}</h2>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
                <p>Category: {recipe.strCategory}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeList;
