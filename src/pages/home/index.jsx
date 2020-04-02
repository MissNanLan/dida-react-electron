import React, { Component } from "react";
import { Layout } from "antd";
import DidaHeader from "../../component/head";
import NoticeTable from "../../component/table";
import NoticeService from "../../service/NoticeService"
const { Header, Footer, Content } = Layout;

class Home extends Component {
  
  render() {
    function insert(){
       let noticeService =  new NoticeService()
       noticeService.insert()
    }
    return (
      <div>
        <Layout>
          <Header>
            <DidaHeader></DidaHeader>
          </Header>
          <Content>
               <NoticeTable></NoticeTable>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default Home;
