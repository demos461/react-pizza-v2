import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="card" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
