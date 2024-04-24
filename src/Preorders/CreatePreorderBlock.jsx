import React from 'react';
import { Button } from 'antd';
import './CreatePreorderBlock.css';

const CreatePreorderBlock = ({ onCreatePreorder }) => {
  return (
    <div className="create-preorder-block">
      <h2>Потребности</h2>
      <Button type="primary" className="create-button" onClick={onCreatePreorder}>Создать</Button>
    </div>
  );
};

export default CreatePreorderBlock;
