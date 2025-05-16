import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FilterOptions from "./FilterOptions";
import "../styles/MainPage.css";

function MainPage() {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredient.trim()) return;
    navigate(`/recipe-list?ingredient=${encodeURIComponent(ingredient.trim())}`);
  };

  return (
    <div className="main-page-container">
      <div className="hero-section">
        <h1 className="app-title">Recipe Book</h1>
        <p className="app-subtitle">Discover delicious recipes from around the world</p>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <input
              type="text"
              placeholder="Search by ingredient (e.g., chicken, pasta, tofu)"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>
        
        <div className="browse-all">
          <span>or</span>
          <button 
            onClick={() => navigate('/recipe-list')} 
            className="browse-all-button"
          >
            Browse All Recipes
          </button>
        </div>
      </div>
      
      <div className="filters-section">
        <h2 className="filters-title">Explore Recipes By</h2>
        <FilterOptions />
      </div>
    </div>
  );
}

export default MainPage;