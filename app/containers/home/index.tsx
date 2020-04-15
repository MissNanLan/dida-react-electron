import React from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Popover
} from 'antd';
import electron from 'electron';
import moment from 'moment';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import { HomeWrapper, FeatureBox } from './style';
import NoticeService from '../../main_service/NoticeService';
const { ipcRenderer } = electron;

interface IState {
  dataSource: any;
  visible?: boolean;
  confirmLoading?: boolean;
}

export default class Home extends React.Component<{}, IState> {
  noticeServie: NoticeService;

  formRef = React.createRef<any>();

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      confirmLoading: false
    };
    this.noticeServie = new NoticeService();
  }

  componentDidMount() {
    this.list();
  }

  createNoticeWindow = () => {
    ipcRenderer.send('create-notice-window', 'this is message');
  };

  add = () => {
    this.setState({
      visible: true
    });
  };

  list = async () => {
    let docs = await this.noticeServie.list();
    this.setState({
      dataSource: docs
    });
  };

  del = async id => {
    await this.noticeServie.del(id);
    await this.list();
  };

  notice = () => {
    this.noticeServie.notice("this message from home")
  };

  handOk = async () => {
    const form = this.formRef.current;
    await form.validateFields();
    this.setState({
      confirmLoading: true
    });
    let doc = form.getFieldsValue();
    await this.noticeServie.insert(doc);
    await this.list();
    form.resetFields();
    this.setState({
      confirmLoading: false,
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { dataSource, visible, confirmLoading } = this.state;

    let delNoticeType = noticeType => {
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

    let columns = [
      {
        title: '提醒时间',
        dataIndex: 'noticeTime',
        key: 'noticeTime',
        width: 200,
        render: noticeTime =>
          moment(noticeTime).format('YYYY年MM月DD日 HH:mm:ss')
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
        render: record => (
          <div>
            <Button type="link" size="small">
              <FormOutlined />
            </Button>

            <Button
              type="link"
              size="small"
              onClick={() => this.del(record._id)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        )
      }
    ];

    function disabledDate(current) {
      // Can not select days before today and today
      return current && current <= moment().endOf('day');
    }

    return (
      <HomeWrapper data-tid="container">
        <FeatureBox>
          <Button type="primary" onClick={this.add}>
            <PlusOutlined />
            增加
          </Button>
          <Button type="primary" onClick={this.notice}>
            <PlusOutlined />
            弹窗
          </Button>
        </FeatureBox>
        <Table columns={columns} dataSource={dataSource} size="small" />
        <Modal
          title="增加提醒"
          visible={visible}
          onOk={this.handOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <div>
            <Form
              ref={this.formRef}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              layout="horizontal"
              initialValues={{
                size: 'small',
                noticeTime: moment(),
                noticeType: 0,
                closeTime: 20,
                noticeTitle: '',
                noticeContent: ''
              }}
            >
              <Form.Item
                label={
                  <span>
                    {/* <Tooltip title="选择需要提醒的方式">
                        <QuestionCircleOutlined />
                      </Tooltip> */}
                    &nbsp;提醒方式
                  </span>
                }
                name="noticeType"
              >
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
              <Form.Item label="关闭窗口">
                <Form.Item name="closeTime" noStyle>
                  <InputNumber min={1} max={60} />
                </Form.Item>
                <span className="ant-form-text"> 分</span>
              </Form.Item>

              <Form.Item
                label="提醒标题"
                name="noticeTitle"
                required
                rules={[
                  {
                    required: true,
                    message: '请选择提醒标题'
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
          </div>
        </Modal>
      </HomeWrapper>
    );
  }
}
