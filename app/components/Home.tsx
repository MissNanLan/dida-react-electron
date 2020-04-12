import React from 'react';
import { Table, Tag, Button,Modal } from 'antd';
import electron from 'electron';
import moment from 'moment'
import styles from './Home.css';
import NoticeService from "../main_service/NoticeService"

const { ipcRenderer } = electron;

interface IState {
  dataSource: Array<any>,
  visible?:boolean,
  confirmLoading?:boolean
}

export default class Home extends React.Component<{}, IState> {
 
  // noticeServie = new NoticeService()
  // noticeServie = null


  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible:false,
      confirmLoading:false
    };
  }
  componentDidMount() {
    this.list()
  }
  createNoticeWindow = () => {
    ipcRenderer.send('create-notice-window','this is message');
  };

  add = () => {
    // this.noticeServie.insert(1, (err, document) => {
    //   this.list()
    // })
    this.setState({visible:true})
  }
  list = () => {
    // this.noticeServie.list((err, ret) => {
    //   this.setState({
    //     dataSource: ret
    //   })
    // })
  }
  del = (id) => {
    // this.noticeServie.del(id, (err, ret) => {
    //   this.list()
    // })
  }
  notice=()=>{
    // this.noticeServie.notice()
  }
  handleOk=()=>{
    this.setState({
      confirmLoading:true
    })

    this.setState({
      confirmLoading:false,
      visible:false
     
    })
    
  }
  handleCancel=()=>{
    this.setState({visible:false})
  }

  render() {
    const { dataSource ,visible,confirmLoading} = this.state
    let delNoticeType = (noticeType) => {
      switch (noticeType) {
        case 0:
          return "一次"
        case 1:
          return "每天"
        case 2:
          return "每星期"
        case 3:
          return "每月"
      }
    }
    let columns = [
      {
        title: "提醒时间",
        dataIndex: "noticeTime",
        key: "noticeTime",
        render:(text)=>(moment(text).format("YYYY年MM月DD日 HH:mm:ss"))
      },
      {
        title: "提醒方式",
        dataIndex: "noticeType",
        key: "noticeType",
        render: (noticeType) => (<span>{delNoticeType(noticeType)}</span>)
      },
      {
        title: "提醒标题",
        dataIndex: "noticeTitle",
        key: "noticeTitle"
      }, {
        title: "操作",
        dataIndex: "_id",
        key: "_id",
        render: (text, record) => (
          <span>
            <a style={{ marginRight: 16 }}>编辑</a>
            <a onClick={()=>this.del(record._id)}>删除</a>
          </span>
        )
      }
    ];

    return (
      <div className={styles.container} data-tid="container">
        {/* <Button onClick={this.createNoticeWindow}>打开窗口</Button> */}
        <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.add} style={{float:"right"}}>
            增加 
          </Button>
          {/* <Button type="primary" onClick={this.notice}>
            弹窗
          </Button> */}
        </div>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title="增加提醒事项"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <p>asfdasdfa</p>
        </Modal>
      </div>
      </div>
    );
  }
}
