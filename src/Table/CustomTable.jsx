import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import './CustomTable.css';

const CustomTable = ({ preorders, pageSizeOptions, defaultPageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: 'Регистрационный номер',
      dataIndex: 'regNumber',
      key: 'regNumber',
    },
    {
      title: 'Конфигурация',
      dataIndex: 'configurationId',
      key: 'configurationId',
    },
    {
      title: 'Среда',
      dataIndex: 'environmentId',
      key: 'environmentId',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = preorders.slice(startIndex, endIndex);

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
