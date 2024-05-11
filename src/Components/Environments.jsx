import React, { useEffect, useState } from 'react';
import CreateBlock from './CreateItems/CreateBlock';
import CreateModal from './CreateItems/CreateModal';


function Environments() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (formData) => {
    console.log('Submitting Configurations form data:', formData);
  };

  return (
    <>
      <div id="content">
        <CreateBlock onCreatePreorder={() => setIsModalOpen(true)} header={"Environments"}/>
        {isModalOpen && 
          <CreateModal 
            onCloseModal={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
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
