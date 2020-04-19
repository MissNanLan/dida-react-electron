import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Row, Col } from 'antd';
import { NavWrapper } from './style';
import routes from '../../constants/routes.json';

export default function Nav() {
  let url = '';
  if (process.env.NODE_ENV === 'production') {
    url = './static/logo.png';
  } else {
    url = `file://${__dirname}/static/logo.png`;
  }

  return (
    <NavWrapper>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <div className="title">
            <img src={url} className="logo" />
            第一稽查局检查一科
          </div>
        </Col>
        <Col span={8} offset={4}>
          <Menu mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={routes.HOME}>定时提醒</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={routes.CASEMANAGE}>案件管理</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </NavWrapper>
  );
}
