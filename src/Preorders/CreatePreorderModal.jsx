import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './CreatePreorderModal.css';

const { Option } = Select;

const CreatePreorderModal = ({ onCloseModal, configurations, environments, preorders }) => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    preorderType: 'VIRTUALIZATION',
    environmentId: environments[0].id,
  });

  const [lastPreorderID, setLastPreorderID] = useState(0);
  const [lastDatacenterID, setLastDatacenterID] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/preorders')
      .then(response => response.json())
      .then(data => {
        const lastID = data.length > 0 ? data[data.length - 1].id : 0;
        setLastPreorderID(lastID);
      })
      .catch(error => console.error('Error fetching last preorder ID:', error));

    fetch('http://localhost:3001/datacenters')
      .then(response => response.json())
      .then(data => {
        const lastID = data.length > 0 ? data[data.length - 1].id : 0;
        setLastDatacenterID(lastID);
      })
      .catch(error => console.error('Error fetching last datacenter ID:', error));
  }, []);

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const newPreorder = {
      id: lastPreorderID + 1,
      regNumber: formData.registrationNumber,
      preorderType: formData.preorderType,
      configurationId: null,
      environmentId: formData.environmentId,
      datacenterIds: [lastDatacenterID + 1],
      isReplication: false,
      status: 'NEW'
    };

    fetch('http://localhost:3001/preorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPreorder),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create preorder');
      }
      return response.json();
    })
    .then(data => {
      console.log('Preorder created successfully:', data);
      onCloseModal();
    })
    .catch(error => {
      console.error('Error creating preorder:', error);
    });
  };

  return (
    <Modal
      title="Создание новой потребности"
      visible={true}
      onCancel={onCloseModal}
      footer={[
        <Button key="cancel" onClick={onCloseModal}>Отмена</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>Создать</Button>
      ]}
    >
      <label htmlFor="registrationNumber">Регистрационный номер:</label>
      <Input id="registrationNumber" name="registrationNumber" value={formData.registrationNumber} onChange={(e) => handleChange(e.target.value, 'registrationNumber')} />

      <label htmlFor="configuration">Конфигурация:</label>
      <Select id="configuration" name="configurationId" value={formData.configurationId} onChange={(value) => handleChange(value, 'configurationId')}>
        {configurations.map(config => (
          <Option key={config.id} value={config.id}>{config.code}</Option>
        ))}
      </Select>

      <label htmlFor="preorderType">Тип потребности:</label>
      <Select id="preorderType" name="preorderType" value={formData.preorderType} onChange={(value) => handleChange(value, 'preorderType')}>
        {preorders.map(preorder => (
          <Option key={preorder.id} value={preorder.id}>{preorder.preorderType}</Option>
        ))}
      </Select>

      <label htmlFor="environment">Среда:</label>
      <Select id="environment" name="environmentId" value={formData.environmentId} onChange={(value) => handleChange(value, 'environmentId')}>
        {environments.map(env => (
          <Option key={env.id} value={env.id}>{env.code}</Option>
        ))}
      </Select>
    </Modal>
  );
};

export default CreatePreorderModal;
