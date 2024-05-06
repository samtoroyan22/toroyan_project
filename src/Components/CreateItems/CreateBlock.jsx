import React from 'react';
import { Button } from 'antd';
import './CreateBlock.css';

const CreateBlock = ({ onCreatePreorder, header }) => {
  return (
    <div className="create-preorder-block">
      <h2>{header}</h2>
      <Button type="primary" className="create-button" onClick={onCreatePreorder}>Создать</Button>
    </div>
  );
};

export default CreateBlock;
