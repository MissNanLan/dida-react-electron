import React from "react";
import { Table, Button } from "antd";
import DidaDialog from './dialog'
import NoticeService from "../../service/NoticeService"

class NoticeTable extends React.Component {
  noticeServie = new NoticeService()
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.list(1, 10)
  }

  add = () => {
    this.noticeServie.insert(1, (err, document) => {
      this.list()
    })
  };
  list = (pageNum = 1, pageSize = 10) => {
    this.noticeServie.list(pageNum, pageSize, (err, ret) => {
      this.setState({
        dataSource: ret
      })
    })
  }
  del = (id) => {
    debugger
    this.noticeServie.del(id, (err, ret) => {
      this.list()
    })
  }

  render() {
    const { dataSource } = this.state
    let delNoticeType = (noticeType) => {
      switch (noticeType) {
        case 0:
          return "一次"
        case 1:
          return "每天"
        case 2:
          return "每星期"
        case 3:
          return "每星期"
      }
    }
    let columns = [
      {
        title: "提醒时间",
        dataIndex: "noticeTime",
        key: "noticeTime"
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
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.add}>
            增加
          </Button>
        </div>
        {/* <DidaDialog></DidaDialog> */}
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

export default NoticeTable;
