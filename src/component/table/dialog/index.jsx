import React, { useState } from "react";
import { Modal } from "antd";
export default function() {
  const [visible, changeModal] = useState(true);

  const handleCancel = () => {
    changeModal(false);
  };
  const handleOk = () => {
    changeModal(false);
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
