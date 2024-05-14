import React, { useState } from 'react';
import './index.css';
import Header from './Header/Header';
import CustomMenu from './menu/Menu';
import { Routes, Route, Outlet } from 'react-router-dom';
import routes from './routes';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleToggleMenu = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
      <CustomMenu onToggleMenu={handleToggleMenu} />
      <Header username="jason statham" />
      <Routes>
        <Route path="/" element={<Outlet />}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
