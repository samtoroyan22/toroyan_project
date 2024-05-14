import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlock from './CreateItems/CreateBlock';
import CreateModal from './CreateItems/CreateModal';
import FilterBlockEntity from './FilterBlock/FilterBlockEntity';
import EntityTable from './Table/EntityTable';
import { fetchFiltered } from '../api/fetchFiltered';
import { fetchEnvironments } from '../api/fetchEnvironments';
import { createEntity } from '../api/createEntity';
import { setEnvironments } from '../slices/environmentsSlice';


function Environments() {
  const dispatch = useDispatch();

  const environments = useSelector(state => state.environments.environments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEnvironments());
  }, [dispatch]);

  const handleSubmitEnvironments = async (formData) => {
    setIsModalOpen(false);
    await createEntity('environments', formData);
    dispatch(fetchPreorders());
  };

  const handleFilterChange = (filters) => {
    dispatch(fetchFiltered(filters, 'environments', setEnvironments));
  };

  return (
    <>
      <div id="content">
        <CreateBlock onCreate={() => setIsModalOpen(true)} header={"Environments"}/>
        <FilterBlockEntity 
          fetchFiltered={handleFilterChange}
          entity={environments}
        />
        <EntityTable
          entity={environments}
          pageSizeOptions={[10, 20, 50]}
          defaultPageSize={10}
        />
        {isModalOpen && 
          <CreateModal 
            onCloseModal={() => setIsModalOpen(false)}
            entity='environments'
            onSubmit={handleSubmitEnvironments}
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

export default Environments;