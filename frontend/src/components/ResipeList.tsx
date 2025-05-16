import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');
  const ingredient = searchParams.get('ingredient');

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/recipes';

        if (search) {
          url += `?search=${encodeURIComponent(search)}`;
        } else if (ingredient) {
          url += `?ingredient=${encodeURIComponent(ingredient)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('Error loading recipes', err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [search, ingredient]);

  return (
    <div>
      <h1>
        {search
          ? `Recipes matching: ${search}`
          : ingredient
          ? `Recipes with ingredient: ${ingredient}`
          : 'All Recipes'}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recipes.map((recipe) => (
            <li key={recipe.idMeal}>
              <Link to={`/recipe/${recipe.idMeal}`}>
                <h3>{recipe.strMeal}</h3>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} width={200} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeList;
