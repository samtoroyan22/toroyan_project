import React, { useState } from 'react';
import { Select, Collapse } from 'antd';
import './FilterBlock.css';
import { setConfigurations } from '../../slices/configurationsSlice';

const { Option } = Select;
const { Panel } = Collapse;

const FilterBlockConfigurations = ({ fetchFiltered, entity }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState({});

  const handleSelectChange = (value, name) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchFiltered(updatedFilters, 'configurations', setConfigurations);
  };

  return (
    <Collapse
      bordered={false}
      activeKey={isCollapsed ? [] : ['filters']}
      onChange={() => setIsCollapsed(!isCollapsed)}
    >
      <Panel header="Фильтры" key="filters" style={{marginLeft: 30}}>
        <div className="filter-block">

          <div className="filter-item">
            <label htmlFor="code">Код:</label>
            <Select id="code" name="code" onChange={(value) => handleSelectChange(value, 'id')}>
              <Option value="">Выберите код конфигурации</Option>
              {entity && entity.map(config => (
                <Option key={config.id} value={config.id}>{config.code}</Option>
              ))}
            </Select>
          </div>

          <div className="filter-item">
            <label htmlFor="title">Заголовок:</label>
            <Select id="title" name="title" onChange={(value) => handleSelectChange(value, 'id')}>
              <Option value="">Выберите заголовок конфигурации</Option>
              {entity && entity.map(config => (
                <Option key={config.id} value={config.id}>{config.title}</Option>
              ))}
            </Select>
          </div>

        </div>
      </Panel>
    </Collapse>
  );
};

export default FilterBlockConfigurations;
