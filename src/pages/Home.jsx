import React, { useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/Pizza/Skeleton';
import { Pizza } from '../components/Pizza';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export const Home = () => {
  const [pizzasItems, setPizzasItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const sortQuery = searchParams.get('sortBy') || '';

  const pizzasSkeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = pizzasItems.map(pizza => <Pizza key={pizza.id} {...pizza} />);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://62a62676b9b74f766a447cc7.mockapi.io/items?search=${searchQuery}&${
          categoryQuery > 0 ? `category=${categoryQuery}` : ''
        }&sortBy=${sortQuery}&order=desc`,
      )
      .then(res => {
        setPizzasItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryQuery, sortQuery, searchQuery]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? pizzasSkeleton : pizzas}</div>
    </>
  );
};
