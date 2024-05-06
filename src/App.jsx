import React, { useState } from 'react';
import './index.css';
import Header from './Header/Header';
import CustomMenu from './menu/Menu';
import { Routes, Route } from 'react-router-dom';
import Preorders from './Components/Preorders';
import Configurations from './Components/Configurations';
import Datacenters from './Components/Datacenters';
import Environments from './Components/Environments';
import Configurations_chart from './Components/Configurations_chart';

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
        <Route path='/' element={<></>} />
        <Route path='/preorders' element={<Preorders />} />
        <Route path='/configurations' element={<Configurations />} />
        <Route path='/datacenters' element={<Datacenters />} />
        <Route path='/environments' element={<Environments />} />
        <Route path='/configurations_chart' element={<Configurations_chart />} />
      </Routes>
    </div>
  );
}

export default App;
