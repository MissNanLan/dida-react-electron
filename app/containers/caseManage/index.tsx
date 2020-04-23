import React, { useState, useRef, useEffect } from 'react';
import { Table, Input, Button, Row, Col, Modal, Tooltip } from 'antd';
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import servcie from '../../main_service/CaseService';
import { CaseManageWrapper, SearchBox, FeatureBox } from './style';
import CaseManageModal from './components/CaseManageModal';

type Props = {
  incrementCase: (params) => void;
  caseList: [];
  deleteCase: (params) => void;
};

type CaseItemType = {
  _id?: string;
  caseName?: string;
  primaryChecker?: string;
  viceChecker?: string;
  interrogator?: string;
  checkDate?: string;
  closingDate?: Date;
};

const { confirm } = Modal;
const { Search } = Input;

export default function CaseManage(props: Props) {
  const { incrementCase, caseList, deleteCase } = props;
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: '案件名称',
      dataIndex: 'caseName',
      key: 'caseName'
    },
    {
      title: '主查员',
      dataIndex: 'primaryChecker',
      key: 'primaryChecker'
    },
    {
      title: '辅查员',
      dataIndex: 'viceChecker',
      key: 'viceChecker'
    },
    {
      title: '审理员',
      key: 'interrogator',
      dataIndex: 'interrogator'
    },
    {
      title: '检查期间',
      key: 'checkDate',
      dataIndex: 'checkDate'
    },
    {
      title: '结案日',
      key: 'closingDate',
      dataIndex: 'closingDate'
    },
    {
      title: '操作',
      dataIndex: '_id',
      key: '_id',
      render: (id, data) => (
        <div>
          <Tooltip placement="bottom" title="编辑">
            <Button type="link" size="small" onClick={() => editCase(id,data)}>
              <FormOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title="删除">
            <Button type="link" size="small" onClick={() => delCase(id)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      )
    }
  ];
  const childRef = useRef();
  let _childRef = childRef.current;

  const addCase = () => {
    if (_childRef) {
      _childRef.value.validateFields().then(values => {
     values.closingDate ? values.closingDate = values.closingDate.format('YYYY-MM-DD HH:mm:ss'):'';
        updateCasedb('', values as CaseItemType);
      });
    }
  };

  const editCase = (id,data) => {
    let { closingDate } = data;
    setVisible(true);
    if (_childRef) {
      _childRef.value.resetFields();
      _childRef.value.setFieldsValue({
        ...data,
        closingDate:moment(closingDate,'YYYY-MM-DD HH:mm:ss')
      });
    }
  };

  const delCase = async id => {
    confirm({
      title: '你确定删除吗',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await servcie.del(id);
        await list();
        setVisible(false);
      },
      onCancel() {}
    });
  };

  const updateCasedb = async (id: string, values: CaseItemType) => {
    if (id) {
      await servcie.update(id, values);
    } else {
      delete values._id;
      await servcie.insert(values);
    }
    await list();
    setVisible(false);
  };

  const openCaseModal = () => {
    setVisible(true);
    if (_childRef) {
      _childRef.value.resetFields();
    }
  };

  useEffect(() => {
    list();
  }, []);

  const list = async () => {
    const caseList = await servcie.list();
    incrementCase(caseList);
  };

  return (
    <CaseManageWrapper>
      <SearchBox>
        <Row gutter={16}>
          <Col className="gutter-row" span={7}>
            <Search
              placeholder="请输入案件名称"
              enterButton="搜索"
              onSearch={value => console.log(value)}
            />
          </Col>
        </Row>
      </SearchBox>
      <FeatureBox>
        <Button type="primary" onClick={() => openCaseModal()}>
          <PlusOutlined />
          增加
        </Button>
      </FeatureBox>
      <Modal
        title="新增案件"
        visible={visible}
        onOk={() => addCase()}
        onCancel={() => setVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <CaseManageModal ref={childRef}></CaseManageModal>
      </Modal>
      <Table columns={columns} dataSource={caseList} />
    </CaseManageWrapper>
  );
}
