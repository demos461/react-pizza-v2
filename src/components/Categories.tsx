import React from 'react';
import { useSearchParams } from 'react-router-dom';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortQuery = searchParams.get('sortBy') || '';
  const categoryQuery = searchParams.get('category') || '';

  const onClickCategory = (index: number) => {
    setSearchParams({ sortBy: sortQuery, category: String(index) });
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            className={+categoryQuery === index ? 'active' : undefined}
            onClick={() => onClickCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
