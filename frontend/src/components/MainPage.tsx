import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainPage() {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState('');

  const handleSearch = () => {
    if (!ingredient.trim()) return;
    navigate(`/recipe-list?ingredient=${ingredient}`);
  };

  return (
    <div>
      <h1>Welcome to the Recipe App</h1>

      <button onClick={() => navigate('/recipe-list')}>All Recipes</button>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter ingredient (e.g., chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button onClick={handleSearch}>Recipes by Ingredient</button>
      </div>
    </div>
  );
}

export default MainPage;
