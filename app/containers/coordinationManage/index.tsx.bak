
import React, { useState,useEffect } from 'react';
import moment from 'moment';
import { Button, Modal, Form, Input, Radio,Table,Popover,Select,DatePicker,InputNumber,Layout,Menu } from 'antd';
import { UserOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Coordination = ()=>{

    const colums = [
        {

        },
        {
        title: '提醒时间',
        dataIndex: 'noticeTime',
        key: 'noticeTime',
        width: 200,
        render: noticeTime =>
            moment(noticeTime).format('YYYY年MM月DD日 HH:mm:ss')
        }
    ]

    return (
        <Layout>
            <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        
                    </Sider>
                </Layout>
            </Content>
        </Layout>
    )
}

export default Coordination