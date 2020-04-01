import React, { Component } from "react";
import { Layout } from "antd";
import DidaHeader from "../../component/head";
import DidaTable from "../../component/table";
const { Header, Footer, Content } = Layout;

class Home extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <DidaHeader></DidaHeader>
          </Header>
          <Content>
               <DidaTable></DidaTable>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default Home;
