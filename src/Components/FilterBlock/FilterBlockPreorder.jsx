import React, { useState } from 'react';
import { Input, Select, Collapse, Button } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import './FilterBlock.css';
import { setPreorders } from '../../slices/preordersSlice';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { Panel } = Collapse;

const FilterBlock = ({ fetchFilteredPreorders, configurations, environments, datacenters, statuses, dispatch }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState({});

  const preorders = useSelector(state => state.preorders.preorders);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      const updatedFilters = { ...filters, [name]: value };
      setFilters(updatedFilters);
      
      if (name === 'regNumber') {
          const filteredPreorders = preorders.filter(preorder =>
              preorder.regNumber.toLowerCase().includes(value.toLowerCase())
          );
          dispatch(setPreorders(filteredPreorders));
      } else {
          fetchFilteredPreorders(updatedFilters, 'preorders', setPreorders);
      }

      if (value === '') {
          setFilters({});
          fetchFilteredPreorders({}, 'preorders', setPreorders);
      }
  };


  const handleSelectChange = (value, name) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchFilteredPreorders(updatedFilters, 'preorders', setPreorders);
  };

  const handleResetFilters = () => {
    setFilters({});
    fetchFilteredPreorders({}, 'preorders', setPreorders);
  };

  const uniqueStatuses = statuses ? [...new Set(statuses.map(stat => stat.status))] : [];

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
            <Input id="registrationNumber" name="regNumber" onChange={handleInputChange} value={filters.regNumber || ''} />
          </div>
          <div className="filter-item">
            <label htmlFor="preorderType">Тип потребности:</label>
            <Select
              id="preorderType"
              name="preorderType"
              onChange={(value) => handleSelectChange(value, 'preorderType')}
              value={filters.preorderType || ''}
              suffixIcon={<ClearOutlined onClick={() => handleSelectChange('', 'preorderType')} />}
            >
              <Option value="SERVER">SERVER</Option>
              <Option value="SHD">SHD</Option>
              <Option value="VIRTUALIZATION">VIRTUALIZATION</Option>
            </Select>
          </div>
          <div className="filter-item">
            <label htmlFor="configurationId">Конфигурация:</label>
            <Select
              id="configurationId"
              name="configurationId"
              onChange={(value) => handleSelectChange(value, 'configurationId')}
              value={filters.configurationId || ''}
              suffixIcon={<ClearOutlined onClick={() => handleSelectChange('', 'configurationId')} />}
            >
              {configurations && configurations.map(config => (
                <Option key={config.id} value={config.id}>{config.title}</Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <label htmlFor="environmentId">Среда:</label>
            <Select
              id="environmentId"
              name="environmentId"
              onChange={(value) => handleSelectChange(value, 'environmentId')}
              value={filters.environmentId || ''}
              suffixIcon={<ClearOutlined onClick={() => handleSelectChange('', 'environmentId')} />}
            >
              {environments && environments.map(env => (
                <Option key={env.id} value={env.id}>{env.title}</Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <label htmlFor="datacenterIds">ЦОДы:</label>
            <Select id="datacenterIds" name="datacenterIds" mode="multiple" onChange={(value) => handleSelectChange(value, 'datacenterIds')} value={filters.datacenterIds || []}>
              {datacenters && datacenters.map(dc => (
                <Option key={dc.id} value={dc.id}>{dc.title}</Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <label htmlFor="status">Статус:</label>
            <Select
              id="status"
              name="status"
              onChange={(value) => handleSelectChange(value, 'status')}
              value={filters.status || ''}
              suffixIcon={<ClearOutlined onClick={() => handleSelectChange('', 'status')} />}
            >
              {uniqueStatuses && uniqueStatuses.map((status, index) => (
                <Option key={index} value={status}>{status}</Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <Button type="default" onClick={handleResetFilters}>Сбросить фильтры</Button>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};

export default FilterBlock;
