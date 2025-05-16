import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>Recipe Details for ID: {id}</h2>
    </div>
  );
}

export default RecipeDetail;
