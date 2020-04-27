import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button,Card,Tag,Empty,Avatar,PageHeader, Descriptions,Typography} from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;

const App = ()=>{

    return(
        <div className="site-card-border-less-wrapper">
            <Card style={{ width: '100%' ,height:'100%'}}
                actions={[
                    // <SettingOutlined key="setting" />,
                    // <EditOutlined key="edit" />,
                    // <EllipsisOutlined key="ellipsis" />,
                ]}
                title="Card title" 
                extra={<Tag color="#108ee9">2017-10-10 10:10:10</Tag>}
            >
                <Meta description="product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system."/>
            </Card>
            {/* <PageHeader
                ghost={false}
                title="TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle"
                tags={<Tag color="blue">2017-10-10 10:10:10</Tag>}
                extra={[
                    // <Button key="1" type="primary">Primary</Button>
                    // <Tag color="blue">2017-10-10 10:10:10</Tag>
                ]}
                >
                <Descriptions size="small" column={1}>
                    <Descriptions.Item  style={{overflowY:"hidden"}}>
                        <Paragraph style={{height:'210px',overflowY:'auto'}}>
                            <Empty description={false} />
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        Ant Design interprets the color system into two levels: a system-level color system and a
                        product-level color system.
                        </Paragraph>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader> */}
        </div>
    )
}
export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
