import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Option } from '../types/types';

function FilterOptions() {
  const [areas, setAreas] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/filters/areas')
      .then(res => res.json())
      .then(setAreas)
      .catch(console.error);

    fetch('http://localhost:5000/filters/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>Filter by Area:</h3>
      {areas.map(area => (
        <button
          key={area.strArea}
          onClick={() => navigate(`/recipe-list?area=${area.strArea}`)}
        >
          {area.strArea}
        </button>
      ))}

      <h3 style={{ marginTop: '2rem' }}>Filter by Category:</h3>
      {categories.map(category => (
        <button
          key={category.strCategory}
          onClick={() => navigate(`/recipe-list?category=${category.strCategory}`)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default FilterOptions;
