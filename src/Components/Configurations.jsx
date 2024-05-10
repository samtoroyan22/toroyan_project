import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlock from './CreateItems/CreateBlock';
import CreateModal from './CreateItems/CreateModal';
import FilterBlockConfigurations from './FilterBlock/FilterBlockEntity';
import ConfigurationsTable from './Table/EntityTable';
import { fetchFiltered } from '../api/fetchFiltered';
import { fetchConfigurations } from '../api/fetchConfigurations';
import { createOrder } from '../api/createPreorder';
import { setConfigurations } from '../slices/configurationsSlice';

function Configurations() {
  const dispatch = useDispatch();

  const configurations = useSelector(state => state.configurations.configurations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchConfigurations());
  }, [dispatch]);

  const handleSubmitPreorder = async (formData) => {
    setIsModalOpen(false);
    dispatch(createOrder(formData, 'configurations'));
  };

  const handleFilterChange = (filters) => {
    dispatch(fetchFiltered(filters, 'configurations', setConfigurations));
  };

  return (
    <>
      <div id="content">
        <CreateBlock onCreatePreorder={() => setIsModalOpen(true)} header={"Configurations"}/>
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
            onSubmit={handleSubmitPreorder}
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
