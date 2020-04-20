import React, { useState, useRef } from 'react';
import { Table, Input, Button, Row, Col, Modal, Tooltip } from 'antd';
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { CaseManageWrapper, SearchBox, FeatureBox } from './style';
import CaseManageModal from './components/CaseManageModal';

type Props = {
  incrementCase: (params) => void;
  caseList: [];
  deleteCase: (params) => void;
};

const { confirm } = Modal;
const { Search } = Input;

export default function CaseManage(props: Props) {
  const { incrementCase, caseList, deleteCase } = props;
  console.log(props);
  const [visible, setVisiable] = useState(false);
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
      render: (index, props) => (
        <div>
          <Tooltip placement="bottom" title="编辑">
            <Button type="link" size="small" onClick={() => editCase(0)}>
              <FormOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title="删除">
            <Button type="link" size="small" onClick={() => delCase(0)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      )
    }
  ];
  const childRef = useRef();
  let _childRef = childRef.current;

  const handOk = () => {
    if (_childRef) {
      let _caseItem = _childRef.value.getFieldsValue();
      caseList.push(_caseItem);
      incrementCase(caseList);
      setVisiable(false);
    }
  };

  const addCase = () => {
    setVisiable(true);
    if (_childRef) {
      _childRef.value.resetFields();
    }
  };

  const editCase = indx => {
    setVisiable(true);
    let _caseItem = caseList.filter((item, index) => index == indx);
    if (_childRef) {
      _childRef.value.resetFields();
      _childRef.value.setFieldsValue(_caseItem[0]);
    }
  };

  const delCase = indx => {
    confirm({
      title: '你确定删除吗',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log(caseList.splice(indx, 0));
        deleteCase(caseList.splice(indx, 0));
      },
      onCancel() {}
    });
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
        <Button type="primary" onClick={() => addCase()}>
          <PlusOutlined />
          增加
        </Button>
      </FeatureBox>
      <Modal
        title="新增案件"
        visible={visible}
        onOk={handOk}
        onCancel={() => setVisiable(false)}
        okText="确认"
        cancelText="取消"
      >
        <CaseManageModal ref={childRef}></CaseManageModal>
      </Modal>
      <Table columns={columns} dataSource={caseList} />
    </CaseManageWrapper>
  );
}
