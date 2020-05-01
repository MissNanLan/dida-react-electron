import React, { useState, useRef, useEffect } from 'react';
import { Table, Input, Button, Row, Col, Modal, Tooltip,Popconfirm } from 'antd';
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  DownloadOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import electron from 'electron';
import { CaseManageWrapper, SearchBox } from './style';
import CaseManageModal from './components/CaseManageModal';

const servcie = electron.remote.getGlobal('caseManageService');


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
  const [selectRow,setSelectRow] = useState([])

  const columns = [
    {
      title: '案件名称',
      dataIndex: 'caseName',
      key: 'caseName'
    },
    {
      title: '案件类型',
      dataIndex: 'caseType',
      key: 'caseType'
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
      title: '金三初次送审日期',
      key: 'jinsanDate',
      dataIndex: 'jinsanDate'
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
      render: (id: any, data: any) => (
        <div>
          <Tooltip placement="bottom" title="编辑">
            <Button type="link" size="small" onClick={() => editCase(id, data)}>
              <FormOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title="删除">
            <Popconfirm title="确定删除?" onConfirm={()=>delCase(id)}  okText="确认" cancelText="取消">
              <Button type="link"size="small" >
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </div>
      )
    }
  ];
  const childRef : any = useRef();
  let _childRef = childRef.current;

  const saveCase = () => {
    if (_childRef) {
      _childRef.value.validateFields().then(values => {
        values.closingDate ? (values.closingDate = values.closingDate.format('YYYY-MM-DD')): '';
        values.jinsanDate ? (values.jinsanDate = values.jinsanDate.format('YYYY-MM-DD')):''
        updateCasedb(id, values as CaseItemType);
      });
    }
  };

  const editCase = (id, data) => {
    let { closingDate,jinsanDate } = data;
    setCaseId(id);
    setVisible(true);
    if (_childRef) {
      _childRef.value.resetFields();
      _childRef.value.setFieldsValue({
        ...data,
        closingDate: moment(closingDate, 'YYYY-MM-DD'),
        jinsanDate: moment(jinsanDate,'YYYY-MM-DD')
      });
    }
  };

  const delCase = async id => {
    await servcie.del(id);
    await list(caseName);
    // confirm({
    //   title: '你确定删除吗',
    //   icon: <ExclamationCircleOutlined />,
    //   onOk: async () => {
    //     await servcie.del(id);
    //     await list(caseName);
    //     setVisible(false);
    //   },
    //   onCancel() {}
    // });
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRow(selectedRows)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    fixed:true,
    columnWidth:22

  };
  const download = ()=>{
    if(selectRow.length>0){
      doDownlod(false)
      return    
    }
    confirm({
      title: '确认导出全部数据?',
      icon: <QuestionCircleOutlined />,
      onOk() {
        doDownlod(true)
      },
      onCancel() {
        
      },
    })
  }
  const doDownlod= async (isAll:Boolean)=>{
      await servcie.downlod(selectRow,isAll)
  }

  return (
    <CaseManageWrapper>
      <SearchBox>
        <Row gutter={16}>
          <Col className="gutter-row" span={7}>
          <Search
              placeholder="请输入案件名称"
              enterButton="搜索"
              onSearch={value => onSearch(value)}
            />
          </Col>
          <Col className="gutter-row" span={7}>
            <Button type="primary" onClick={() => addCase()}>
              <PlusOutlined />
              新增
            </Button>
            <Button  style={{marginLeft:'8px'}} onClick={() => {download();}}>
            <DownloadOutlined />
            导出
          </Button>
          </Col>
        </Row>
      </SearchBox>
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
      <Table columns={columns} dataSource={caseList} rowKey='_id' bordered  size="small" rowSelection={rowSelection}/>
    </CaseManageWrapper>
  );
}
