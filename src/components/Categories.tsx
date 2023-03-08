import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { selectCategory, setCategory } from '../store/slices/filterSlice';
import { useAppSelector } from '../hooks/useAppSelector';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC = () => {
  const category = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();

  const onClickCategory = (index: number) => {
    dispatch(setCategory(index));
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            className={category === index ? 'active' : undefined}
            onClick={() => onClickCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
