import React, { useState } from 'react';
import { Modal, Form, Input, Select, Switch, Button } from 'antd';

const EditModal = ({ visible, onCancel, onSave, onDelete, data, configurations, environments, datacenters, statuses }) => {
  const [form] = Form.useForm();

  const uniqueStatuses = statuses ? [...new Set(statuses.map(stat => stat.status))] : [];

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave(data.id, values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      open={visible}
      title="Редактировать элемент"
      onCancel={onCancel}
      footer={[
        <Button key="delete" onClick={() => onDelete(data.id)}>
          Удалить
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Отменить
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Сохранить
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
      >
        <Form.Item
          name="regNumber"
          label="Регистрационный номер"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="preorderType"
          label="Тип потребности"
        >
          <Select>
            <Select.Option value="SERVER">SERVER</Select.Option>
            <Select.Option value="SHD">SHD</Select.Option>
            <Select.Option value="VIRTUALIZATION">VIRTUALIZATION</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="configurationId"
          label="Конфигурация"
        >
          <Select>
            {configurations.map(config => (
              <Select.Option key={config.id} value={config.id}>{config.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="environmentId"
          label="Среда"
        >
          <Select>
            {environments.map(env => (
              <Select.Option key={env.id} value={env.id}>{env.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="datacenterIds"
          label="ЦОДы"
        >
          <Select mode="multiple">
            {datacenters.map(dc => (
              <Select.Option key={dc.id} value={dc.id}>{dc.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="isReplication"
          label="Репликация"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="status"
          label="Статус"
        >
           <Select>
                {uniqueStatuses && uniqueStatuses.map((status, index) => (
                    <Option key={index} value={status}>{status}</Option>
                ))}
            </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
