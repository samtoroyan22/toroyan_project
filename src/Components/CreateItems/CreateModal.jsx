import React, { useState } from 'react';
import { Modal, Input, Button, Form, message, Switch, Checkbox, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { createPreorder } from '../../api/createPreorder';

const { Option } = Select;

const CreateModal = ({ onCloseModal, fieldsConfig }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();

      const newData = { ...values, status: "NEW"};

      dispatch(createPreorder(newData));

      message.success('Успешно создано');
      onCloseModal();
    } catch (error) {
      console.error('Ошибка создания:', error);
      message.error('Ошибка создания. Пожалуйста попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Создать"
      open={true}
      onCancel={onCloseModal}
      footer={[
        <Button key="cancel" onClick={onCloseModal}>Отменить</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} loading={isSubmitting}>Создать</Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
      >
        {fieldsConfig.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            value={field.value}
            rules={field.type !== 'switch' && field.type !== 'checkbox' && field.name !== 'description' ? [{ required: true, message: `Пожалуйста заполните: ${field.label}` }] : null}
          >
            {field.type === 'select' ? (
              <Select mode={field.mode}>
                {field.options.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            ) : (
              field.type === 'switch' ? <Switch /> :
              field.type === 'checkbox' ? <Checkbox checked={field.checked} disabled={field.disabled}>{field.value}</Checkbox> :
              <Input />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default CreateModal;
