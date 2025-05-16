import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RecipeDetail.css';

type Ingredient = {
  name: string;
  measure: string;
};

type RecipeDetails = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  ingredients: Ingredient[];
};

type RelatedRecipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<RelatedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const ingredients: Ingredient[] = [];
        for (let i = 1; i <= 20; i++) {
          const ingredientKey = `strIngredient${i}`;
          const measureKey = `strMeasure${i}`;
          
          if (data[ingredientKey] && data[ingredientKey].trim() !== '') {
            ingredients.push({
              name: data[ingredientKey],
              measure: data[measureKey] || ''
            });
          }
        }
        
        setRecipe({
          ...data,
          ingredients
        });

        if (data.strCategory) {
          const relatedResponse = await fetch(`http://localhost:5000/recipes?category=${encodeURIComponent(data.strCategory)}`);
          const relatedData = await relatedResponse.json();
          setRelatedRecipes(
            relatedData
              .filter((r: RelatedRecipe) => r.idMeal !== id)
              .slice(0, 5)
          );
        }
      } catch (err) {
        console.error('Error fetching recipe details:', err);
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleAreaClick = () => {
    if (recipe?.strArea) {
      navigate(`/recipe-list?area=${encodeURIComponent(recipe.strArea)}`);
    }
  };

  const handleIngredientClick = (ingredient: string) => {
    navigate(`/recipe-list?ingredient=${encodeURIComponent(ingredient)}`);
  };

  const handleCategoryRecipeClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading) return <div className="loading">Loading recipe details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!recipe) return <div className="not-found">Recipe not found</div>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail-main">
        <div className="recipe-header">
          <div className="recipe-image-container">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-detail-image" />
          </div>
          <div className="recipe-header-info">
            <h1 className="recipe-detail-title">{recipe.strMeal}</h1>
            <div className="recipe-meta">
              <span 
                className="recipe-area clickable" 
                onClick={handleAreaClick}
              >
                {recipe.strArea} Cuisine
              </span>
              <span className="recipe-category">{recipe.strCategory}</span>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span 
                    className="ingredient-name clickable" 
                    onClick={() => handleIngredientClick(ingredient.name)}
                  >
                    {ingredient.name}
                  </span>
                  <span className="ingredient-measure">{ingredient.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-instructions">
            <h2>Instructions</h2>
            <div className="instructions-text">
              {recipe.strInstructions.split('\n').map((paragraph, index) => (
                paragraph.trim() ? <p key={index}>{paragraph}</p> : null
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-sidebar">
        <h3>More {recipe.strCategory} Recipes</h3>
        <ul className="related-recipes-list">
          {relatedRecipes.length > 0 ? (
            relatedRecipes.map(relatedRecipe => (
              <li 
                key={relatedRecipe.idMeal} 
                className="related-recipe-item"
                onClick={() => handleCategoryRecipeClick(relatedRecipe.idMeal)}
              >
                <img 
                  src={relatedRecipe.strMealThumb} 
                  alt={relatedRecipe.strMeal} 
                  className="related-recipe-image" 
                />
                <span className="related-recipe-name">{relatedRecipe.strMeal}</span>
              </li>
            ))
          ) : (
            <p>No related recipes found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetail;