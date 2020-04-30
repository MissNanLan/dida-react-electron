import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import { ipcRenderer } from 'electron';
import { Card,Tag,Button,Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Meta } = Card;

const App = ()=>{

    const [message, setMessage] = useState({});

    useEffect(()=>{
        ipcRenderer.on('dataJsonPort',(event, message)=>{
          setMessage(message)
          console.log(message)
        })
    },[])
    const menu = (
        <Menu>
          <Menu.Item>
            <a  rel="noopener noreferrer" onClick={()=>handelNotice(15)}>
              15分钟后提醒
            </a>
          </Menu.Item>
          <Menu.Item>
            <a rel="noopener noreferrer" onClick={()=>handelNotice(30)}>
                30分钟后提醒
            </a>
          </Menu.Item>
          <Menu.Item>
            <a rel="noopener noreferrer" onClick={()=>handelNotice(60)}>
                一小时后提醒
            </a>
          </Menu.Item>
        </Menu>
    );
    const handelNotice = (later=0)=>{
        let reply = {
            _id:message["_id"],
            later:later
        }
        console.log(reply)
        ipcRenderer.send("noticeReply",reply)
    }

    return(
        <div className="site-card-border-less-wrapper">
            <Card style={{ width: '100%' ,height:'100%'}}
                actions={[
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        暂不处理 <DownOutlined />
                        </a>
                    </Dropdown>,
                     <a  rel="noopener noreferrer" onClick={()=>handelNotice(0)}>
                     我知道了
                    </a>
                ]}
                title={message['noticeTitle']}
                extra={<Tag color="#108ee9">{moment().format('YYYY年MM月DD日 HH:mm:ss')}</Tag>}
            >
                <Meta description={message['noticeContent']}/>
            </Card>
        </div>
    )
}
export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
