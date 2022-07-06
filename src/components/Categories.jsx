import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../store/slices/filterSlice';

export const Categories = () => {
  const category = useSelector(state => state.filter.category);
  const dispatch = useDispatch();

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = i => {
    dispatch(setCategory(i));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            className={category === index ? 'active' : null}
            onClick={() => onClickCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
