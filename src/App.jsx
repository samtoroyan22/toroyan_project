import React, { useState } from 'react';
import './index.css';
import Header from './Header/Header';
import CustomMenu from './menu/Menu';
import { Routes, Route, Outlet  } from 'react-router-dom';
import Preorders from './Components/Preorders';
import Configurations from './Components/Configurations';
import Datacenters from './Components/Datacenters';
import Environments from './Components/Environments';
import ConfigurationsChart from './Components/ConfigurationsChart';
import CreateModal from './Components/CreateItems/CreateModal';

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
        <Route path='/' element={<Outlet/>}>
          <Route path='preorders' element={<Preorders />}>
            <Route path=":id" element={<CreateModal />} />
          </Route>
          <Route path='configurations' element={<Configurations />}>
            <Route path=":id" element={<CreateModal />} />
          </Route>
          <Route path='datacenters' element={<Datacenters />}>
            <Route path=":id" element={<CreateModal />} />
          </Route>
          <Route path='environments' element={<Environments />}>
            <Route path=":id" element={<CreateModal />} />
          </Route>
          <Route path='configurations_chart' element={<ConfigurationsChart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
