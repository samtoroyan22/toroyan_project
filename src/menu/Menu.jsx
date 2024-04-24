import React, { useState } from 'react';
import { MenuOutlined, HeartOutlined, FolderOpenOutlined, DatabaseOutlined, EnvironmentOutlined, LeftOutlined } from '@ant-design/icons';
import MenuItem from './MenuItem';
import './Menu.css';

const Menu = ({ onToggleMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Потребности');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onToggleMenu(!isMenuOpen);
  };

  return (
    <div className={`menu-container ${isMenuOpen ? 'open' : 'closed'}`}>
      <ul className="menu-list">
        <li className="toggle-button" onClick={toggleMenu}>
          {isMenuOpen ? <LeftOutlined className="menu-icon" /> : <MenuOutlined className="menu-icon" />}
          <span className="menu-title">Меню</span>
        </li>
        <MenuItem
          title="Потребности"
          isActive={activeSection === 'Потребности'}
          onClick={() => setActiveSection('Потребности')}
          icon={<HeartOutlined />}
        />
        <MenuItem
          title="Конфигурации"
          isActive={activeSection === 'Конфигурации'}
          onClick={() => setActiveSection('Конфигурации')}
          icon={<FolderOpenOutlined />}
        />
        <MenuItem
          title="ЦОДы"
          isActive={activeSection === 'ЦОДы'}
          onClick={() => setActiveSection('ЦОДы')}
          icon={< DatabaseOutlined/>}
        />
        <MenuItem
          title="Среды"
          isActive={activeSection === 'Среды'}
          onClick={() => setActiveSection('Среды')}
          icon={<EnvironmentOutlined />}
        />
      </ul>
    </div>
  );
};

export default Menu;
