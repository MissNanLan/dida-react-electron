import React, { useState } from 'react';
import { Table, Input, Button, Row, Col, Modal, Tooltip } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { CaseManageWrapper, SearchBox, FeatureBox } from './style';
import CaseManageModal from './components/CaseManageModal';
const { Search } = Input;

type Props = {};

export default function CaseManage(props: Props) {
  const [visible, addCase] = useState(false);

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
      key: 'colsingDate',
      dataIndex: 'colsingDate'
    },
    {
      title: '操作',
      dataIndex: '_id',
      key: '_id',
      render: () => (
        <div>
          <Tooltip placement="bottom" title="编辑">
            <Button type="link" size="small">
              <FormOutlined />
            </Button>
          </Tooltip>
          
          <Tooltip placement="bottom" title="删除">
            <Button type="link" size="small">
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      )
    }
  ];

  const data = [
    {
      key: '1',
      caseName: '案件名称',
      primaryChecker: '蒋小姐',
      viceChecker: '石先生',
      interrogator: '胖胖',
      checkDate: '2020-04-13',
      colsingDate: '2020-04-13'
    },
    {
      key: '2',
      caseName: '案件名称',
      primaryChecker: '蒋小姐',
      viceChecker: '石先生',
      interrogator: '胖胖',
      checkDate: '2020-04-13',
      colsingDate: '2020-04-13'
    }
  ];

  let handOk = () => {};

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
        <Button type="primary" onClick={() => addCase(true)}>
          <PlusOutlined />
          增加
        </Button>
      </FeatureBox>
      <Modal
        title="新增案件"
        visible={visible}
        onOk={handOk}
        onCancel={() => addCase(false)}
        okText="确认"
        cancelText="取消"
      >
        <CaseManageModal></CaseManageModal>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </CaseManageWrapper>
  );
}
