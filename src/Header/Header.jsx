import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import './Header.css';

const Header = ({ username }) => {
  return (
    <div className="header">
      <div className="user-info">
        <div className="icon-block">
          <UserOutlined className="user-icon" />
        </div>
        <span className="username">{username}</span>
      </div>
    </div>
  );
};

export default Header;
