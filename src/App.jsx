import './scss/app.scss';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { Pizza } from './components/Pizza';
import { useEffect, useState } from 'react';

export const App = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('https://62a62676b9b74f766a447cc7.mockapi.io/items')
      .then(res => {
        return res.json();
      })
      .then(arr => {
        setPizzas(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map(obj => (
              <Pizza key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
