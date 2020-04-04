import React from "react";
import { Menu, Row, Col } from "antd";

export default function (props) {
  const linkTo = (type) => {
    console.log(props);
    // props.props.history.push('/caseManage');
  };

  return (
    <div>
      <Row>
        <Col span={6}>
          <div style={{ color: "#fff", fontWeight: "bold" }}>
            第一稽查局检查一科
          </div>
        </Col>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">定时提醒</Menu.Item>
            <Menu.Item key="2" onClick={linkTo}>案件管理</Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
