import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlock from './CreateItems/CreateBlock';
import CreateModal from './CreateItems/CreateModal';
import FilterBlock from './FilterBlock/FilterBlockPreorder';
import PreordersTable from './Table/PreordersTable';
import { fetchPreorders } from '../api/fetchPreorders';
import { fetchFiltered } from '../api/fetchFiltered';
import { fetchEnvironments } from '../api/fetchEnvironments';
import { fetchConfigurations } from '../api/fetchConfigurations';
import { fetchDatacenters } from '../api/fetchDatacenters';
import { createOrder } from '../api/createPreorder';
import { setPreorders } from '../slices/preordersSlice';

function Preorders() {
  const dispatch = useDispatch();

  const environments = useSelector(state => state.environments.environments);
  const configurations = useSelector(state => state.configurations.configurations);
  const datacenters = useSelector(state => state.datacenters.datacenters);
  const preorders = useSelector(state => state.preorders.preorders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEnvironments());
    dispatch(fetchDatacenters());
    dispatch(fetchPreorders());
    dispatch(fetchConfigurations());
  }, [dispatch]);

  const handleSubmitPreorder = async (formData) => {
    setIsModalOpen(false);
    dispatch(createOrder(formData, 'preorders'));
  };

  const handleFilterChange = (filters) => {
    dispatch(fetchFiltered(filters, 'preorders', setPreorders));

  };

  return (
    <>
      <div id="content">
        <CreateBlock onCreatePreorder={() => setIsModalOpen(true)} header={"Preorders"} />
        <FilterBlock 
          fetchFilteredPreorders={handleFilterChange}
          configurations={configurations} 
          environments={environments}
          datacenters={datacenters}
          statuses={preorders}
        />
        <PreordersTable 
          preorders={preorders}
          configurations={configurations}
          environments={environments}
          datacenters={datacenters}
          pageSizeOptions={[10, 20, 50]}
          defaultPageSize={10}
        />
        {isModalOpen && 
          <CreateModal 
            onCloseModal={() => setIsModalOpen(false)}
            onSubmit={handleSubmitPreorder}
            fieldsConfig={[
              { name: 'regNumber', label: 'Регистарционный номер', type: 'text' },
              { name: 'preorderType', label: 'Тип потребности', type: 'select', options: [
                { value: 'SERVER', label: 'SERVER' },
                { value: 'SHD', label: 'SHD' },
                { value: 'VIRTUALIZATION', label: 'VIRTUALIZATION' }
              ] },
              { name: 'configurationId', label: 'Конфигурация', type: 'select', options: configurations.map(config => ({ value: config.id, label: config.title })) },
              { name: 'environmentId', label: 'Среда', type: 'select', options: environments.map(env => ({ value: env.id, label: env.title })) },
              { name: 'datacenterIds', label: 'ЦОДы', type: 'select', mode: 'multiple', options: datacenters.map(dc => ({ value: dc.id, label: dc.title })) },
              { name: 'isReplication', label: 'Репликация', type: 'switch' },
              { name: 'status', label: 'Статус', value: "New", type: 'checkbox', disabled: true, checked: "checked"}
            ]}
          />
        }
      </div>
    </>
  );
}

export default Preorders;
