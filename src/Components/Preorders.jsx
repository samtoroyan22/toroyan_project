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
import { createEntity } from '../api/createEntity';
import { updateEntity } from '../api/updateEntity';
import { deleteEntity } from '../api/deleteEntity';
import { setPreorders } from '../slices/preordersSlice';

function Preorders() {
  const dispatch = useDispatch();

  const environments = useSelector(state => state.environments.environments);
  const configurations = useSelector(state => state.configurations.configurations);
  const datacenters = useSelector(state => state.datacenters.datacenters);
  const preorders = useSelector(state => state.preorders.preorders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchEnvironments());
    dispatch(fetchDatacenters());
    dispatch(fetchPreorders());
    dispatch(fetchConfigurations());
  }, [dispatch]);

  const handleSubmitPreorder = async (formData) => {
    setIsModalOpen(false);
    await createEntity('preorders', formData);
    dispatch(fetchPreorders());
  };

  const handleEditPreorder = async (formData) => {
    setIsModalOpen(false);
    await updateEntity('preorders', formData.id, formData);
    dispatch(fetchPreorders());
  };

  const handleDeletePreorder = async (id) => {
    setIsModalOpen(false);
    await deleteEntity('preorders', id);
    dispatch(fetchPreorders());
  };

  const handleFilterChange = (filters) => {
    dispatch(fetchFiltered(filters, 'preorders', setPreorders));
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  

  return (
    <>
      <div id="content">
        <CreateBlock onCreate={() => setIsModalOpen(true)} header={"Preorders"} />
        <FilterBlock 
          fetchFilteredPreorders={handleFilterChange}
          configurations={configurations} 
          environments={environments}
          datacenters={datacenters}
          statuses={preorders}
          dispatch={dispatch}
        />

        <PreordersTable 
          preorders={preorders}
          fetchPreorders={fetchPreorders}
          configurations={configurations}
          environments={environments}
          datacenters={datacenters}
          pageSizeOptions={[10, 20, 50]}
          defaultPageSize={10}
          onEdit={handleEditClick}
        />
        {isModalOpen && 
          <CreateModal 
            onCloseModal={() => setIsModalOpen(false)}
            entity='preorders'
            onSubmit={selectedItem ? handleEditPreorder : handleSubmitPreorder}
            onDelete={handleDeletePreorder}
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
            initialData={selectedItem}
          />
        }
      </div>
    </>
  );
}

export default Preorders;
