import React, { useRef, useImperativeHandle } from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const CaseManageModal = React.forwardRef((props, ref) => {
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const [form] = Form.useForm();
  const childRef = useRef(null);
  const dateFormat = 'YYYY-MM-DD';
  useImperativeHandle(ref, () => {
    return {
      value: childRef.current
    };
  });

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      ref={childRef}
      initialValues={{
       
      }}
    >
      <Form.Item
        name="caseName"
        label="案件名称"
        rules={[
          {
            required: true,
            message: '请输入案件名称'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="caseType"
        label="案件类型"
        rules={[
          // {
          //   required: true,
          //   message: '请输入主查员'
          // }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="primaryChecker"
        label="主查员"
        rules={[
          // {
          //   required: true,
          //   message: '请输入主查员'
          // }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="viceChecker"
        label="辅查员"
        rules={[
          // {
          //   required: true,
          //   message: '请输入辅查员'
          // }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="interrogator"
        label="审理员"
        rules={[
          // {
          //   required: true,
          //   message: '请输入审理员'
          // }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="checkDate" label="检查期间">
        <Input />
      </Form.Item>
      <Form.Item
        name="jinsanDate"
        label="金三初次送审日期"
        rules={[
          // {
          //   required: true,
          //   message: '请选择结案日'
          // }
        ]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        name="closingDate"
        label="结案日"
        rules={[
          // {
          //   required: true,
          //   message: '请选择结案日'
          // }
        ]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
    </Form>
  );
});

export default CaseManageModal;
