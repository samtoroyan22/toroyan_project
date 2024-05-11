import React, { useState } from 'react';
import { MenuOutlined, HeartOutlined, FolderOpenOutlined, DatabaseOutlined, EnvironmentOutlined, LineChartOutlined, LeftOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Menu.css';

export default function CustomMenu({ onToggleMenu }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const items = [
    {
      label: <Link to='/preorders'>Потребности</Link>,
      key: "preorders",
      icon: <HeartOutlined />
    },
    {
      label: <Link to='/configurations'>Конфигурации</Link>,
      key: "configurations",
      icon: <FolderOpenOutlined />
    },
    {
      label: <Link to='/datacenters'>ЦОДы</Link>,
      key: "datacenters",
      icon: <DatabaseOutlined />
    },
    {
      label: <Link to='/environments'>Среды</Link>,
      key: "environments",
      icon: <EnvironmentOutlined />
    },
    {
      label: <Link to='/configurations_chart'>Графики</Link>,
      key: "configurations_chart",
      icon: <LineChartOutlined />
    }
  ];

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
        <Menu 
          mode="inline" 
          style={{ backgroundColor: "#3462a2" }} 
          items={items} 
          theme='dark'
        />
      </ul>
    </div>
  );
};