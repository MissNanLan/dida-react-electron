import React, { Component } from "react";
import { Layout } from "antd";
import DidaHeader from "../../component/head";
import NoticeService from "../../service/NoticeService";
const { Header, Footer, Content } = Layout;

class Home extends React.PureComponent {
  render() {
    console.log(this.props);
    return (
      <div>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <DidaHeader props={this.props} history={this.props.history}></DidaHeader>
          </Header>

          <Content className="site-layout" style={{
            padding: "0 25px",
            marginTop: 64,
            height: "600px",
            margin: "90px 0",
          }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </div>
    );
  }
}
export default Home;
