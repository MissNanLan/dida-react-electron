import React, { Component } from "react";
import { Layout, Menu,Row, Col } from "antd";
import DidaHeader from "../../component/head";
import NoticeTable from "../../component/table";
import NoticeService from "../../service/NoticeService"
const { Header, Footer, Content } = Layout;

class Home extends Component {

  render() {
    function insert() {
      let noticeService = new NoticeService()
      noticeService.insert()
    }
    return (
      <div>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Row>
              <Col span={6} >
                <div style={{color:'#fff',fontWeight:'bold'}}>第一稽查局检查一科</div>
               </Col>
              <Col span={18} >
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">定时提醒</Menu.Item>
                  <Menu.Item key="2">档案管理</Menu.Item>
                </Menu>
              </Col>
            </Row>


            {/* <DidaHeader></DidaHeader> */}
          </Header>
          <Content className="site-layout" style={{ padding: '0 25px', marginTop: 64, height: '600px', margin: '90px 0' }}>
            <NoticeTable></NoticeTable>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default Home;
