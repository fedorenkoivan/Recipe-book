import { useParams } from 'react-router-dom';

function RecipeByIngredient() {
  const { id } = useParams();

  return (
    <div>
      <h1>Recipe Details for ID: {id}</h1>
      {/* You will fetch and display detailed info here */}
    </div>
  );
}

export default RecipeByIngredient;
