import React, { useEffect, useState } from 'react';
import './index.css';
import Menu from './menu/Menu';
import Header from './Header/Header';
import CreatePreorderBlock from './Preorders/CreatePreorderBlock';
import CreatePreorderModal from './Preorders/CreatePreorderModal';
import FilterBlock from './FilterBlock/FilterBlock';
import CustomTable from './Table/CustomTable';

function App() {
  const [environments, setEnvironments] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [preorders, setPreorders] = useState([]);
  const [filteredPreorders, setFilteredPreorders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/environments')
      .then(response => response.json())
      .then(data => setEnvironments(data))
      .catch(error => console.error('Error fetching environments:', error));

    fetch('http://localhost:3001/preorders')
      .then(response => response.json())
      .then(data => {
        setPreorders(data);
        setFilteredPreorders(data);
      })
      .catch(error => console.error('Error fetching preorders:', error));
    
    fetch('http://localhost:3001/configurations')
      .then(response => response.json())
      .then(data => setConfigurations(data))
      .catch(error => console.error('Error fetching configurations:', error));
  }, []);

  const handleToggleMenu = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  const handleCreatePreorder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPreorder = (formData) => {
    console.log('Form data:', formData);
    setIsModalOpen(false);
    setPreorders([...preorders, formData]);
    setFilteredPreorders([...filteredPreorders, formData]);
  };

  const handleFilterChange = (filters) => {
    const filteredOrders = preorders.filter(order => {
      for (let key in filters) {
        if (filters[key] !== "" && order[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
    setFilteredPreorders(filteredOrders);
  };

  return (
    <div className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
      <Header username="jason statham" />
      <Menu onToggleMenu={handleToggleMenu} />
      <div id="content">
        <CreatePreorderBlock onCreatePreorder={handleCreatePreorder} />
        <FilterBlock 
          configurations={configurations} 
          environments={environments} 
          statuses={preorders}
          onFilterChange={handleFilterChange} 
        />
        <CustomTable preorders={filteredPreorders}
          pageSizeOptions={[10, 20, 50]}
          defaultPageSize={10}
          isMenuOpen={isMenuOpen} />
      </div>
      {isModalOpen && 
        <CreatePreorderModal 
          onCloseModal={handleCloseModal}
          onSubmit={handleSubmitPreorder}
          configurations={configurations}
          environments={environments}
          preorders={preorders}
        />}
    </div>
  );
}

export default App;
