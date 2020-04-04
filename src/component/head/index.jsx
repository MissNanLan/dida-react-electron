import React from "react";
import { Menu, Row, Col } from "antd";
import { Link } from "react-router-dom";

export default function (props) {
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
            <Menu.Item key="1">
              <Link to="/">定时提醒</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/caseManage"> 案件管理</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
