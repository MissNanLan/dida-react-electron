import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
export default function () {



  return (
    <div>
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
      
      >
        定时提醒
      </Button>
      
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
   
      >
        案件管理
      </Button>
    </div>
  );
}
