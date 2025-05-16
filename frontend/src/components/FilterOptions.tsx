import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Option } from '../types/types';
import '../styles/FilterOptions.css';

function FilterOptions() {
  const [areas, setAreas] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      try {
        const [areasResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:5000/filters/areas'),
          fetch('http://localhost:5000/filters/categories')
        ]);

        const areasData = await areasResponse.json();
        const categoriesData = await categoriesResponse.json();

        setAreas(areasData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterClick = (type: 'area' | 'category', value: string) => {
    if (type === 'area') {
      navigate(`/recipe-list?area=${encodeURIComponent(value)}`);
    } else {
      navigate(`/recipe-list?category=${encodeURIComponent(value)}`);
    }
  };

  if (loading) {
    return <div className="filters-loading">Loading filters...</div>;
  }

  return (
    <div className="filters-container">
      <div className="filter-section">
        <h3 className="filter-title">Cuisines</h3>
        <div className="filter-buttons">
          {areas.map(area => (
            <button
              key={area.strArea}
              className="filter-button"
              onClick={() => handleFilterClick('area', area.strArea!)}
            >
              {area.strArea}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category.strCategory}
              className="filter-button"
              onClick={() => handleFilterClick('category', category.strCategory!)}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;