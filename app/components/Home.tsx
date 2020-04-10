import React from 'react';
import { Table, Tag, Button } from 'antd';
import electron from 'electron';
import styles from './Home.css';

const { Column, ColumnGroup } = Table;
const { ipcRenderer } = electron;

export default class Home extends React.Component {
  createNoticeWindow = () => {
    ipcRenderer.send('create-notice-window');
  };

  render() {
    const data = [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ];

    return (
      <div className={styles.container} data-tid="container">
        <Button onClick={this.createNoticeWindow}>打开窗口</Button>
        <Table dataSource={data}>
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </span>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a style={{ marginRight: 16 }}>Invite {record.lastName}</a>
                <a>Delete</a>
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}
