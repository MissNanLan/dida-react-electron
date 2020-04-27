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

// import electron from 'electron';
// import Datastore from 'nedb-promises';

// const db = electron.remote.getGlobal('db')
// const caseManageDb:Datastore = db.case

type Props = {
  updateCase: (params) => void;
  caseList: [];
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
  const { updateCase, caseList } = props;
  const [visible, setVisible] = useState(false);
  const [id, setCaseId] = useState('');
  const [caseName, setSearchName] = useState('');

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
            <Button type="link" size="small" onClick={() => editCase(id, data)}>
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

  const saveCase = () => {
    if (_childRef) {
      _childRef.value.validateFields().then(values => {
        values.closingDate
          ? (values.closingDate = values.closingDate.format(
              'YYYY-MM-DD HH:mm:ss'
            ))
          : '';
        updateCasedb(id, values as CaseItemType);
      });
    }
  };

  const editCase = (id, data) => {
    let { closingDate } = data;
    setCaseId(id);
    setVisible(true);
    if (_childRef) {
      _childRef.value.resetFields();
      _childRef.value.setFieldsValue({
        ...data,
        closingDate: moment(closingDate, 'YYYY-MM-DD HH:mm:ss')
      });
    }
  };

  const delCase = async id => {
    confirm({
      title: '你确定删除吗',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await servcie.del(id);
        await list(caseName);
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
    await list(caseName);
    setVisible(false);
  };

  const addCase = () => {
    setVisible(true);
    setCaseId('');
    if (_childRef) {
      _childRef.value.resetFields();
    }
  };

  const onSearch = async value => {
    setSearchName(caseName);
    await list(value);
  };

  useEffect(() => {
    list(caseName);
  }, []);

  const list = async caseName => {
    const caseList = await servcie.list(caseName);
    updateCase(caseList);
  };

//   const list1 =  (keyword:string)=>{
//     return new Promise((resolve,reject)=>{
//       const reg =  new RegExp(`${keyword}`, "i");
//       caseManageDb.find({ caseName: 'ar' }, function (err, docs) {
//          if(err){
//           reject(err)
//          }else {
//            resolve(docs)
//          }
//       });
//     })
//  }
  const data = [
    // {
    //   key: '1',
    //   caseName: '案件名称',
    //   primaryChecker: '蒋小姐',
    //   viceChecker: '石先生',
    //   interrogator: '胖胖',
    //   checkDate: '2020-04-13',
    //   colsingDate: '2020-04-13'
    // },
    // {
    //   key: '2',
    //   caseName: '案件名称',
    //   primaryChecker: '蒋小姐',
    //   viceChecker: '石先生',
    //   interrogator: '胖胖',
    //   checkDate: '2020-04-13',
    //   colsingDate: '2020-04-13'
    // }
  ];

  return (
    <CaseManageWrapper>
      <SearchBox>
        <Row gutter={16}>
          <Col className="gutter-row" span={7}>
          <Search
              placeholder="请输入案件名称"
              onSearch={value => onSearch(value)}
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
        onOk={() => saveCase()}
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
