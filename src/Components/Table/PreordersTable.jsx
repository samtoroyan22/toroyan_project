import React, { useState, useEffect } from 'react';
import { Table, Pagination, Switch } from 'antd';
import EditModal from '../EditItems/EditModal';
import { updateEntity } from '../../api/updateEntity';
import { deleteEntity } from '../../api/deleteEntity';
import './PreordersTable.css';

const PreordersTable = ({ preorders, fetchPreorders, pageSizeOptions, defaultPageSize, configurations, environments, datacenters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchPreorders();
  }, [fetchPreorders]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleEdit = (record) => {
    setSelectedItem(record);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedItem(null);
  };

  const handleSave = async (id, newData) => {
    try {
      await updateEntity('preorders', id, newData);
      setEditModalVisible(false);
      setSelectedItem(null);
      fetchPreorders();
    } catch (error) {
      console.error('Error updating preorder:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEntity('preorders', id);
      fetchPreorders();
    } catch (error) {
      console.error('Error deleting preorder:', error);
    }
  };


  const preordersWithData = preorders.map(preorder => {
    const configuration = configurations.find(config => config.id == preorder.configurationId);
    const environment = environments.find(env => env.id == preorder.environmentId);
    const datacenterTitles = preorder.datacenterIds.map(dcId => {
      const datacenter = datacenters.find(dc => dc.id == dcId);
      return datacenter ? datacenter.title : '';
    });
    
    return {
      ...preorder,
      configuration: configuration ? configuration.title : '',
      environment: environment ? environment.title : '',
      datacenters: datacenterTitles.join(', '),
    };
  });

  const columns = [
    {
      title: 'Регистрационный номер',
      dataIndex: 'regNumber',
      key: 'regNumber',
      render: (text, record) => <a onClick={() => handleEdit(record)}>{text}</a>,
    },
    {
      title: 'Тип потребности',
      dataIndex: 'preorderType',
      key: 'preorderType',
    },
    {
      title: 'Конфигурация',
      dataIndex: 'configuration',
      key: 'configuration',
    },
    {
      title: 'Среда',
      dataIndex: 'environment',
      key: 'environment',
    },
    {
      title: 'ЦОДы',
      dataIndex: 'datacenters',
      key: 'datacenters',
    },
    {
      title: 'Репликация',
      dataIndex: 'isReplication',
      key: 'isReplication',
      render: (isReplication) => <Switch disabled checked={isReplication} />,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = preordersWithData.slice(startIndex, endIndex);

  return (
    <>
    <div className="custom-table">
      <div>Найдено {preorders.length}</div>
      <Table
        dataSource={displayedData}
        columns={columns}
        pagination={false}
        rowKey={record => record.id}
      />
      <Pagination
        className="custom-pagination"
        showSizeChanger
        pageSizeOptions={pageSizeOptions}
        defaultPageSize={defaultPageSize}
        total={preorders.length}
        current={currentPage}
        onChange={handlePageChange}
        onShowSizeChange={(current, size) => handlePageChange(1, size)}
        />
    </div>
    {editModalVisible && selectedItem && (
        <EditModal
          visible={editModalVisible}
          onCancel={handleEditModalCancel}
          onSave={handleSave}
          onDelete={handleDelete}
          data={selectedItem}
          configurations={configurations}
          environments={environments}
          datacenters={datacenters}
          statuses={preorders}
        />
      )}
  </>
  );
};

export default PreordersTable;
