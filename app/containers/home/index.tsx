import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Modal, Form, Input,Table,Popover,Select,DatePicker,InputNumber } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import {  HomeWrapper, FeatureBox } from './style';

import electron from 'electron';
const noticeService = electron.remote.getGlobal('noticeService')


interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  formData: any;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  formData
}) => {
  const [form] = Form.useForm();

  const disabledDate = current => {
    // Can not select days before today and today
    return current && current <= moment().endOf('day');
  };

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData
      });
    }
    return () => {
      form.resetFields();
    };
  }, [formData]);

  return (
    <Modal
      visible={visible}
      title="编辑提醒"
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      forceRender={true}
      destroyOnClose={false}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            values.noticeTime = values.noticeTime.toDate()
            onCreate(values as Values);
            form.resetFields();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{noticeType:0,closeTime:0,noticeTime:moment()}}
      >
        <Form.Item label="id" name="_id" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item label={<span>&nbsp;提醒方式</span>} name="noticeType">
          <Select>
            <Select.Option value={0}>一次</Select.Option>
            <Select.Option value={1}>每天</Select.Option>
            <Select.Option value={2}>每周</Select.Option>
            <Select.Option value={3}>每月</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="提醒日期"
          name="noticeTime"
          required
          rules={[
            {
              required: true,
              message: '请选择提醒时间'
            }
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDate}
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            showToday={true}
            style={{ width: '100%' }}
          />
        </Form.Item>
        {/* <Form.Item label="关闭窗口">
          <Form.Item name="closeTime" noStyle>
            <InputNumber min={0} max={60} />
          </Form.Item>
          <span className="ant-form-text"> 分(0从不关闭)</span>
        </Form.Item> */}

        <Form.Item
          label="提醒标题"
          name="noticeTitle"
          required
          rules={[
            {
              required: true,
              message: '请输入提醒标题'
            }
          ]}
        >
          <Input placeholder={'输入标题'} />
        </Form.Item>
        <Form.Item label="提醒内容" name="noticeContent">
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            placeholder={'输入提醒内容'}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    listData();
  }, []);

  const listData = async () => {
    let docs = await noticeService.list();
    setDataSource(docs as never[])
  }

  const saveData = async data => {
    if (!data['_id']) {
      console.log('Received values of insert: ', data);
      noticeService.insert(data);
    } else {
      console.log('Received values of update: ', data);
      noticeService.update(data);
    }
    setFormData(null);
  };

  const onCreate = async values => {
    await saveData(values);
    await listData();
    setVisible(false);
  };

  const delNoticeType = noticeType => {
    switch (noticeType) {
      case 0:
        return '一次';
      case 1:
        return '每天';
      case 2:
        return '每星期';
      case 3:
        return '每月';
      default:
        return '';
    }
  };

  const edit = async data => {
    setVisible(true);
    setFormData({
      ...data,
      noticeTime:moment(data.noticeTime)
    });
  };

  const del = async id => {
    await noticeService.del(id);
    await listData();
  };

  const columns = [
    {
      title: '提醒时间',
      dataIndex: 'noticeTime',
      key: 'noticeTime',
      width: 200,
      render: noticeTime => moment(noticeTime).format('YYYY年MM月DD日 HH:mm:ss')
    },
    {
      title: '提醒标题',
      dataIndex: 'noticeTitle',
      key: 'noticeTitle',
      width: 500,
      render: (title, record) => (
        <Popover
          placement="topLeft"
          title={title}
          content={record.noticeContent}
          trigger="hover"
        >
          {title}
        </Popover>
      )
    },
    {
      title: '提醒方式',
      dataIndex: 'noticeType',
      key: 'noticeType',
      render: noticeType => <span>{delNoticeType(noticeType)}</span>
    },

    {
      title: '操作',
      dataIndex: '_id',
      key: '_id',
      render: (id, data) => (
        <div>
          <Button type="link" size="small" onClick={() => edit(data)}>
            <FormOutlined />
          </Button>

          <Button type="link" size="small" onClick={() => del(id)}>
            <DeleteOutlined />
          </Button>
        </div>
      )
    }
  ];

  return (
    <HomeWrapper>
      <FeatureBox>
        <Button type="primary" onClick={() => {setVisible(true);}}>
          <PlusOutlined />
          增加
        </Button>
        <Button type="primary" onClick={() => {
          noticeService.notice(JSON.stringify({noticeTitle:'标题',noticeContent:'内容',closeTime:0.5}));}}>
          <PlusOutlined />
          弹窗
        </Button>
      </FeatureBox>
     
      <Table columns={columns} rowKey='_id' dataSource={dataSource} size="small" />
      <CollectionCreateForm visible={visible} onCreate={onCreate} onCancel={() => {setVisible(false);setFormData(null);}} 
        formData={formData}
      />
    </HomeWrapper>
  );
};
export default Home;
