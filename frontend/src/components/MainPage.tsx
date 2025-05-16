import { useNavigate } from "react-router-dom";

function MainPage() {

    const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Recipe App</h1>
      <button
      onClick={() => navigate('/recipe-list')}
      >All recipes</button>
      <input type="text" name="" id="" />
      <button
      onClick={() => navigate('/recipe:id')}
      >Recipe by ingredient</button>
    </div>
  );
}

export default MainPage;
