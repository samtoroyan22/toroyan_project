import React from 'react';
import { Button } from 'antd';
import './CreateBlock.css';

const CreateBlock = ({ onCreate, header }) => {
  return (
    <div className="create-preorder-block">
      <h2>{header}</h2>
      <Button type="primary" className="create-button" onClick={onCreate}>Создать</Button>
    </div>
  );
};

export default CreateBlock;
