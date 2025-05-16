import { useParams } from 'react-router-dom';

function RecipeByIngredient() {
  const { id } = useParams();

  return (
    <div>
      <h1>Recipe Details for ID: {id}</h1>
    </div>
  );
}

export default RecipeByIngredient;
