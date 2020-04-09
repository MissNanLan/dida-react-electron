import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import routes from '../../constants/routes.json';
const { Header, Content, Footer } = Layout;

export default function Home() {
    return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1"><Link to={routes.HOME}>to Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to={routes.COUNTER}>to Counter</Link></Menu.Item>
      </Menu>
    </Header>
    )
}