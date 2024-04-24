import React from 'react';

const MenuItem = ({ icon, title, isActive, onClick }) => {
  return (
    <li className={`menu-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      {icon}
      <span className="menu-title">{title}</span>
    </li>
  );
};

export default MenuItem;
