import React from "react";
import { Table, Button } from "antd";
import DidaDialog from './dialog'

export default function() {
  const add = () => {};
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号"
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    }
  ];

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address"
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={add}>
          增加
        </Button>
      </div>
       <DidaDialog></DidaDialog>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
