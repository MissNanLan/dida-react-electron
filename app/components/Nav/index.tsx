import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { NavWrapper } from './style';
import routes from '../../constants/routes.json';

export default function Nav() {
  return (
    <NavWrapper>
      <div className="title">这是标题ddd</div>
      <div className="nav">
        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Link to={routes.HOME}>定时提醒</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={routes.COUNTER}>案件管理</Link>
          </Menu.Item>
        </Menu>
      </div>
    </NavWrapper>
  );
}
