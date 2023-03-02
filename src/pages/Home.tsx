import React, { useEffect } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/Pizza/Skeleton';
import { Pizza } from '../components/Pizza';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas, selectPizzasData } from '../store/slices/pizzasSlice';

export const Home: React.FC = () => {
  const { items, status } = useSelector(selectPizzasData);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const sortQuery = searchParams.get('sortBy') || '';

  const pizzasSkeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items && items.map((pizza: any) => <Pizza key={pizza.id} {...pizza} />);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPizzas({
      searchQuery,
      categoryQuery,
      sortQuery,
    }));
    window.scrollTo(0, 0);
  }, [dispatch, categoryQuery, sortQuery, searchQuery]);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {
        status === 'error'
          ? (
            <div className='content__error-info'>
              <h2>Произошла ошибка 😕</h2>
              <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
            </div>
          )
          : <div className='content__items'>{status === 'loading' ? pizzasSkeleton : pizzas}</div>

      }
    </>
  );
};
