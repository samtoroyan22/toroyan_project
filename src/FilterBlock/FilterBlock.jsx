import React from 'react';
import { Input, Select } from 'antd';
import './FilterBlock.css';

const { Option } = Select;

const FilterBlock = ({ configurations, environments, statuses, onFilterChange }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleSelectChange = (value, name) => {
    onFilterChange({ [name]: value });
  };

  const uniqueStatuses = [...new Set(statuses.map(stat => stat.status))];

  return (
    <div className="filter-block">
      <div className="filter-item">
        <label htmlFor="registrationNumber">Регистрационный номер:</label>
        <Input id="registrationNumber" name="registrationNumber" onChange={handleInputChange} />
      </div>
      <div className="filter-item">
        <label htmlFor="configuration">Конфигурация:</label>
        <Select id="configuration" name="configurationId" onChange={(value) => handleSelectChange(value, 'configurationId')}>
          <Option value="">Выберите конфигурацию</Option>
          {configurations.map(config => (
            <Option key={config.id} value={config.id}>{config.code}</Option>
          ))}
        </Select>
      </div>
      <div className="filter-item">
        <label htmlFor="environment">Среда:</label>
        <Select id="environment" name="environmentId" onChange={(value) => handleSelectChange(value, 'environmentId')}>
          <Option value="">Выберите среду</Option>
          {environments.map(env => (
            <Option key={env.id} value={env.id}>{env.code}</Option>
          ))}
        </Select>
      </div>
      <div className="filter-item">
        <label htmlFor="status">Статус:</label>
        <Select id="status" name="status" onChange={(value) => handleSelectChange(value, 'status')}>
            <Option value="">Выберите статус</Option>
            {uniqueStatuses.map((status, index) => (
                <Option key={index} value={status}>{status}</Option>
            ))}
        </Select>
      </div>
    </div>
  );
};

export default FilterBlock;
