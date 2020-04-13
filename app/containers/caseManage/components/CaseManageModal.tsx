import React from 'react';
import { Form, Input, DatePicker } from 'antd';
type Props = {};

export default function CaseManageModal(props: Props) {
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  const [form] = Form.useForm();

  const onGenderChange = value => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!'
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!'
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!'
        });
    }
  };

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male'
    });
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item
        name="caseName"
        label="案件名称"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="primaryChecker"
        label="主查员"
        rules={[
          {
            required: true
          }
        ]}
      >
        {' '}
        <Input />
      </Form.Item>
      <Form.Item
        name="viceChecker"
        label="辅查员"
        rules={[
          {
            required: true
          }
        ]}
      >
        {' '}
        <Input />
      </Form.Item>
      <Form.Item
        name="interrogator"
        label="审理员"
        rules={[
          {
            required: true
          }
        ]}
      >
        {' '}
        <Input />
      </Form.Item>
      <Form.Item
        name="checkDate"
        label="检查期间"
        rules={[
          {
            required: true
          }
        ]}
      >
        {' '}
        <Input />
      </Form.Item>
      <Form.Item
        name="colsingDate"
        label="结案日"
        rules={[
          {
            required: true
          }
        ]}
      >
        {' '}
        <DatePicker />
      </Form.Item>
    </Form>
  );
}
