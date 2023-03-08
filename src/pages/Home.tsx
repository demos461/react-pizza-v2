import React, { useEffect } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/Pizza/Skeleton';
import { Pizza } from '../components/Pizza';
import {
  fetchPizzas,
  PizzaItemType,
  selectPizzasData,
} from '../store/slices/pizzasSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  selectCategory,
  selectSearch,
  selectSortOrder,
  selectSortProperty,
} from '../store/slices/filterSlice';

export const Home: React.FC = () => {
  const { items, status } = useAppSelector(selectPizzasData);
  const category = useAppSelector(selectCategory);
  const search = useAppSelector(selectSearch);
  const sort = useAppSelector(selectSortProperty);
  const order = useAppSelector(selectSortOrder);
  const dispatch = useAppDispatch();

  const pizzasSkeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((pizza: PizzaItemType) => <Pizza key={pizza.id} {...pizza} />);

  useEffect(() => {
    dispatch(
      fetchPizzas({
        search,
        category,
        sort,
        order,
      }),
    );
    window.scrollTo(0, 0);
  }, [dispatch, category, sort, search, order]);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? pizzasSkeleton : pizzas}
        </div>
      )}
    </>
  );
};
