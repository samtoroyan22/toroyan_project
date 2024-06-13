import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import './PreordersTable.css';

const ConfigurationsTable = ({ entity, pageSizeOptions, defaultPageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = entity.slice(startIndex, endIndex);

  return (
    <div className="custom-table">
      <div>Найдено {entity.length}</div>
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
        total={entity.length}
        current={currentPage}
        onChange={handlePageChange}
        onShowSizeChange={(current, size) => handlePageChange(1, size)}
      />
    </div>
  );
};

export default ConfigurationsTable;
