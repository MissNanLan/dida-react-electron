import React from 'react';
import { Form, Input, DatePicker ,Button} from 'antd';
import moment from 'moment';
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

  const [form] = Form.useForm();


  const dateFormat = 'YYYY-MM-DD';

  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{
        closingDate:moment(new Date(), dateFormat),
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
        name="primaryChecker"
        label="主查员"
        rules={[
          {
            required: true,
            message: '请输入主查员'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="viceChecker"
        label="辅查员"
        rules={[
          {
            required: true,
            message: '请输入辅查员'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="interrogator"
        label="审理员"
        rules={[
          {
            required: true,
            message: '请输入审理员'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="checkDate"
        label="检查期间"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="closingDate"
        label="结案日"
        rules={[
          {
            required: true,
            message: '请选择结案日'
          }
        ]}
      >
        <DatePicker format={dateFormat}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
            Submit
          </Button>
      </Form.Item>
    </Form>
  );
}
