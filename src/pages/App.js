import React, { Component } from 'react';
import RouterIndex from '@routes/index';
import '@assets/css/app.less';
import { Button, Spin } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  render() {
    const { loading } = this.state;
    console.log('loading加载状态', loading);
    // const loading = true;
    return (
      <Spin spinning={loading} wrapperClassName="page-loading">
        <div>
          <RouterIndex />
        </div>
      </Spin>
    );
  }
}

export default App;

