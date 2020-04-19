
import React, { useState,useEffect } from 'react';
import ReactDOM from "react-dom";
import { ipcRenderer } from 'electron';
import { Button,Typography } from 'antd';
import { PlusOutlined} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const DialogWindow = ()=>{
  const [message, setMessage] = useState('');
  
  useEffect(()=>{
    ipcRenderer.on('dataJsonPort',(event, message)=>{
      setMessage(message)
      console.log(message)
    })
    setInterval(()=>{
      ipcRenderer.send('close-notice-window','close')                
    }, message.closeTime*60*1000);
  },[])

  return (
    <Typography>
      <Title>{message.noticeTitle}</Title>
      <Paragraph>{message.noticeContent}</Paragraph>
    </Typography>
  )
}

export default DialogWindow;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<DialogWindow />, wrapper) : false;