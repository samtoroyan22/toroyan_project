import React, { useState } from 'react';
import { Input, Select, Collapse } from 'antd';
import './FilterBlock.css';

const { Option } = Select;
const { Panel } = Collapse;

const FilterBlock = ({ fetchFilteredPreorders, configurations, environments, datacenters, statuses }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchFilteredPreorders(updatedFilters);
  };

  const handleSelectChange = (value, name) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchFilteredPreorders(updatedFilters);
  };

  const uniqueStatuses = [...new Set(statuses.map(stat => stat.status))];

  return (
    <Collapse
      bordered={false}
      activeKey={isCollapsed ? [] : ['filters']}
      onChange={() => setIsCollapsed(!isCollapsed)}
    >
      <Panel header="Фильтры" key="filters" style={{marginLeft: 30}}>
        <div className="filter-block">
          <div className="filter-item">
            <label htmlFor="registrationNumber">Регистрационный номер:</label>
            <Input id="registrationNumber" name="regNumber" onChange={handleInputChange} />
          </div>
          <div className="filter-item">
            <label htmlFor="preorderType">Тип потребности:</label>
            <Select id="preorderType" name="preorderType" onChange={(value) => handleSelectChange(value, 'preorderType')}>
              <Option value="">Выберите тип потребности</Option>
              <Option value="SERVER">SERVER</Option>
              <Option value="SHD">SHD</Option>
              <Option value="VIRTUALIZATION">VIRTUALIZATION</Option>
            </Select>
          </div>
          <div className="filter-item">
            <label htmlFor="configurationId">Конфигурация:</label>
            <Select id="configurationId" name="configurationId" onChange={(value) => handleSelectChange(value, 'configurationId')}>
              <Option value="">Выберите конфигурацию</Option>
              {configurations.map(config => (
                <Option key={config.id} value={config.id}>{config.title}</Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <label htmlFor="environmentId">Среда:</label>
            <Select id="environmentId" name="environmentId" onChange={(value) => handleSelectChange(value, 'environmentId')}>
              <Option value="">Выберите среду</Option>
              {environments.map(env => (
                <Option key={env.id} value={env.id}>{env.title}</Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <label htmlFor="datacenterIds">ЦОДы:</label>
            <Select id="datacenterIds" name="datacenterIds" mode="multiple" onChange={(value) => handleSelectChange(value, 'datacenterIds')}>
              {datacenters.map(dc => (
                <Option key={dc.id} value={dc.id}>{dc.title}</Option>
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
      </Panel>
    </Collapse>
  );
};

export default FilterBlock;
