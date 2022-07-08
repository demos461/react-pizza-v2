import React, { useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/Pizza/Skeleton';
import { Pizza } from '../components/Pizza';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const Home = () => {
  const [pizzasItems, setPizzasItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { category, sort, currentPage } = useSelector(state => state.filter);
  const searchValue = useSelector(state => state.pizzas.searchValue);

  const pizzasSkeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const pizzas = pizzasItems.map(pizza => <Pizza key={pizza.id} {...pizza} />);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://62a62676b9b74f766a447cc7.mockapi.io/items?search=${searchValue}&${
          category > 0 ? `category=${category}` : ''
        }&sortBy=${sort.sortProperty}&order=desc`,
      )
      .then(res => {
        setPizzasItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, currentPage, searchValue]);

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
