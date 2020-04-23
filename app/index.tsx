import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore , history } from './store';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './app.global.less';
const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
const store = configureStore();

document.addEventListener('DOMContentLoaded', () =>
  render(
    <ConfigProvider locale={zhCN}>
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>
    </ConfigProvider>,
    document.getElementById('root')
  )
);
