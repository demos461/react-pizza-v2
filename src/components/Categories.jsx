import { useState } from 'react';

export const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeCategory, setActiveCategory] = useState(0);

  const onClickCategory = index => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={`${category}-${index}`}
            className={activeCategory === index ? 'active' : null}
            onClick={() => onClickCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
