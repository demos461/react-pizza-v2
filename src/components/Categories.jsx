export const Categories = ({ value, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            className={value === index ? 'active' : null}
            onClick={() => onClickCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
