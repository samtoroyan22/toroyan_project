import React, { useState } from 'react';
import { Table, Pagination, Switch } from 'antd';
import './CustomTable.css';

const CustomTable = ({ preorders, pageSizeOptions, defaultPageSize, configurations, environments, datacenters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
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
  );
};

export default CustomTable;
