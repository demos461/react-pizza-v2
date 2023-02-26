import { useSearchParams } from 'react-router-dom';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortQuery = searchParams.get('sortBy') || '';
  const categoryQuery = searchParams.get('category') || '';

  const onClickCategory = i => {
    setSearchParams({ sortBy: sortQuery, category: i });
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            className={+categoryQuery === index ? 'active' : null}
            onClick={() => onClickCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
