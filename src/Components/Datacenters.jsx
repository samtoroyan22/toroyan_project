import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlock from './CreateItems/CreateBlock';
import CreateModal from './CreateItems/CreateModal';
import FilterBlockEntity from './FilterBlock/FilterBlockEntity';
import EntityTable from './Table/EntityTable';
import { fetchFiltered } from '../api/fetchFiltered';
import { fetchDatacenters } from '../api/fetchDatacenters';
import { createEntity } from '../api/createEntity';
import { setDatacenters } from '../slices/datacentersSlice';


function Datacenters() {
  const dispatch = useDispatch();

  const datacenters = useSelector(state => state.datacenters.datacenters);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDatacenters());
  }, [dispatch]);

  const handleSubmitDatacenters = async (formData) => {
    setIsModalOpen(false);
    await createEntity('datacenters', formData);
    dispatch(fetchPreorders());
  };

  const handleFilterChange = (filters) => {
    dispatch(fetchFiltered(filters, 'datacenters', setDatacenters));
  };


  return (
    <>
      <div id="content">
        <CreateBlock onCreate={() => setIsModalOpen(true)} header={"Datacenters"}/>
        <FilterBlockEntity 
          fetchFiltered={handleFilterChange}
          entity={datacenters}
        />
        <EntityTable
          entity={datacenters}
          pageSizeOptions={[10, 20, 50]}
          defaultPageSize={10}
        />
        {isModalOpen && 
          <CreateModal 
            onCloseModal={() => setIsModalOpen(false)}
            entity='datacenters'
            onSubmit={handleSubmitDatacenters}
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

export default Datacenters;