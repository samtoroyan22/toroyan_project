import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlock from './CreateItems/CreateBlock';
import CreateModal from './CreateItems/CreateModal';
import FilterBlockConfigurations from './FilterBlock/FilterBlockEntity';
import ConfigurationsTable from './Table/EntityTable';
import { fetchFiltered } from '../api/fetchFiltered';
import { fetchConfigurations } from '../api/fetchConfigurations';
import { createEntity } from '../api/createEntity';
import { setConfigurations } from '../slices/configurationsSlice';

function Configurations() {
  const dispatch = useDispatch();

  const configurations = useSelector(state => state.configurations.configurations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchConfigurations());
  }, [dispatch]);

  const handleSubmitConfigurations = async (formData) => {
    setIsModalOpen(false);
    await createEntity('configurations', formData);
    dispatch(fetchConfigurations());
  };

  const handleFilterChange = (filters) => {
    dispatch(fetchFiltered(filters, 'configurations', setConfigurations));
  };

  return (
    <>
      <div id="content">
        <CreateBlock onCreate={() => setIsModalOpen(true)} header={"Configurations"}/>
        <FilterBlockConfigurations 
          fetchFiltered={handleFilterChange}
          entity={configurations}
        />
        <ConfigurationsTable
          entity={configurations}
          pageSizeOptions={[10, 20, 50]}
          defaultPageSize={10}
        />
        {isModalOpen && 
          <CreateModal 
            onCloseModal={() => setIsModalOpen(false)}
            entity='configurations'
            onSubmit={handleSubmitConfigurations}
            fieldsConfig={[
              { name: 'code', label: 'Код', type: 'text' },
              { name: 'title', label: 'Заголовок', type: 'text' },
              { name: 'description', label: 'Описание', type: 'text' }
            ]}
          />
        }
      </div>
    </>
  );
}

export default Configurations;
