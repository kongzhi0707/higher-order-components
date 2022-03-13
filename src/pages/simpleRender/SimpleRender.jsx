
import React from 'react';
import SimpleRenderHoc from './SimpleRenderHoc';

@SimpleRenderHoc
class SimpleRender extends React.Component {
  render() {
    const { setVisible } = this.props;
    return <div>
      <p>hello, my name is kongzhi</p>
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&fm=26&gp=0.jpg" />
      <button onClick={() => setVisible()}>卸载当前组件</button>
    </div>
  }
}

export default SimpleRender;