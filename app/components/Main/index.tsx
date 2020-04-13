import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Nav from '../Nav';
import { HeaderStyle } from './style';
import Sider from 'antd/lib/layout/Sider';
const { Header, Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function Main(props: Props) {
  return (
    <Layout >
      <Header>
        <Nav></Nav>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
}
