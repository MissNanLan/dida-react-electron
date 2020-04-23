import React, { useState,useEffect } from 'react';
import { Table, Input,Button, Popconfirm, Form,Modal ,DatePicker} from 'antd';
import moment from 'moment';
import { PlusOutlined,FormOutlined, DeleteOutlined } from '@ant-design/icons';

import servcie from '../../main_service/CoordinationService'

interface Values {
  _id?: string
  number?: string
  type?:string
  taxpayer?: string
  department?: string
  requireReplyTime?: string
  receiver?: string
  receiveTime?: string
  replyReceiver?: string
  replyReceiveTime?: string
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (id:string,values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel
}) => {
  const [form] = Form.useForm();

   
  return (
    <Modal
      visible={visible}
      title="编辑协查记录"
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      forceRender={true}
      destroyOnClose={false}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            values.requireReplyTime? values.requireReplyTime = values.requireReplyTime.format('YYYY年MM月DD日 HH:mm:ss') : ''
            values.receiveTime? values.receiveTime = values.receiveTime.format('YYYY年MM月DD日 HH:mm:ss') : ''
            values.replyReceiveTime? values.replyReceiveTime = values.replyReceiveTime.format('YYYY年MM月DD日 HH:mm:ss') : ''
            onCreate('',values as Values);
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
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        initialValues={ {
          number: '',
          type:'',
          taxpayer:'',
          department:'',
          requireReplyTime:'',
          receiver:'',
          receiveTime:'',
          replyReceiver:'',
          replyReceiveTime:''
          }}
      >
        <Form.Item label="id" name="_id" style={{display:'none'}}>
            <Input />
        </Form.Item>
        <Form.Item label="协查编号" name="number">
            <Input placeholder={'输入协查编号'} />
        </Form.Item>
        <Form.Item label="问题类型" name="type">
            <Input placeholder={'输入问题类型'} />
        </Form.Item>
        <Form.Item label="涉及纳税人" name="taxpayer">
            <Input placeholder={'输入涉及纳税人'} />
        </Form.Item>
        <Form.Item label="转办部门" name="department">
            <Input placeholder={'输入转办部门'} />
        </Form.Item>
        <Form.Item label="要求回函时间" name="requireReplyTime">
            <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showToday={true}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                style={{ width: '100%' }}
                placeholder="输入要求回函时间"
            />
        </Form.Item>
        <Form.Item label="接收人" name="receiver">
            <Input placeholder={'输入接收人'} />
        </Form.Item>
        <Form.Item label="接收时间" name="receiveTime">
            <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showToday={true}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                style={{ width: '100%' }}
                placeholder="选择接收时间"
            />
        </Form.Item>
        <Form.Item label="回函接收人" name="replyReceiver">
            <Input placeholder={'输入回函接收人'} />
        </Form.Item>
        <Form.Item label="接收时间" name="replyReceiveTime">
          <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showToday={true}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                style={{ width: '100%' }}
                placeholder="选择接收时间"
            />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'time' ? <DatePicker showTime/> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Coordination = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [current,setCurrent] = useState(1)
  const [pageSize,setPageSize] = useState(6)

  const [visible, setVisible] = useState(false);

  const isEditing = record => record._id === editingKey;

  useEffect(()=>{
    list()
  },[])

  const list = async ()=>{
    const docList = await servcie.list()
    setData(docList as never[])
  }

  const edit = record => {
    const {requireReplyTime,receiveTime,replyReceiveTime} = record
    form.setFieldsValue({
      ...record,
      requireReplyTime:moment(requireReplyTime,'YYYY年MM月DD日 HH:mm:ss'),
      receiveTime:moment(receiveTime,'YYYY年MM月DD日 HH:mm:ss'),
      replyReceiveTime:moment(replyReceiveTime,'YYYY年MM月DD日 HH:mm:ss')
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async record => {
    try {
        await form.validateFields().then(values => {
        form.resetFields();
        values.requireReplyTime? values.requireReplyTime = values.requireReplyTime.format('YYYY年MM月DD日 HH:mm:ss') : ''
        values.receiveTime? values.receiveTime = values.receiveTime.format('YYYY年MM月DD日 HH:mm:ss') : ''
        values.replyReceiveTime? values.replyReceiveTime = values.replyReceiveTime.format('YYYY年MM月DD日 HH:mm:ss') : ''
        onCreate(record._id,values);
        setEditingKey('');
      })
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const onCreate = async (id:string,formValues:any) => {
    if(id){
      await servcie.update(id,formValues)
    }else{
      delete formValues._id
      await servcie.insert(formValues)
    }
    await list()
    setVisible(false);

  };

  const del = async (id:string)=>{
    await servcie.del(id)
    await list()
  }


  const columns = [
    {
        title: '序号',
        width: '1%',
        render:(text,record,index)=>`${((current-1)*10)+(index+1)}`,
        dataIndex:'_id',
    },
    {
      title: '协查编号',
      dataIndex: 'number',
      width: '12%',
      editable: true,
    },
    {
        title: '问题类型',
        dataIndex: 'type',
        width: '10%',
        editable: true,
    },
    {
        title: '涉及纳税人',
        dataIndex: 'taxpayer',
        width: '10%',
        editable: true,
    },
    {
        title: '转办部门',
        dataIndex: 'department',
        width: '10%',
        editable: true,
    },
    {
        title: '要求回函时间',
        dataIndex: 'requireReplyTime',
        width: '10%',
        editable: true,
    },
    {
        title: '接收人',
        dataIndex: 'receiver',
        width: '10%',
        editable: true,
    },
    {
        title: '接收时间',
        dataIndex: 'receiveTime',
        width: '10%',
        editable: true,
    },
    {
        title: '回函接收人',
        dataIndex: 'replyReceiver',
        width: '10%',
        editable: true,
    },
    {
        title: '接收时间',
        dataIndex: 'replyReceiveTime',
        width: '10%',
        editable: true
    },
    {
      title: '操作',
      dataIndex: '_id',
      width: '7%',
      render: (id, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="确定取消编辑?" onConfirm={cancel}  okText="确认" cancelText="取消">
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button type="link" size="small" disabled={editingKey !== ''} onClick={()=>edit(record)}>
              <FormOutlined />
            </Button>
            <Popconfirm title="确定删除?" onConfirm={()=>del(id)}  okText="确认" cancelText="取消">
              <Button type="link"size="small" >
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const timeIndex = ['requireReplyTime','receiveTime','replyReceiveTime']


  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: timeIndex.includes(col.dataIndex)  ? 'time' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  return (
    <div style={{overflow:'auto'}}>
        <Form form={form} component={false}>
        <div style={{margin:16}}>
          <Button type="primary" onClick={() => {setVisible(true);}}>
            <PlusOutlined />增加
          </Button>
        </div>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: (page)=>{setCurrent(page)},
            current:current,
            pageSize:pageSize,
            showSizeChanger:true,
            showQuickJumper:true,
            responsive:true,
            onShowSizeChange:(_,size)=>{setPageSize(size)}
          }}
          style={{width:'100%'}}
          rowKey="_id"
        />
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }} 
        />
      </Form>
    </div>
    
  );
};

export default Coordination
