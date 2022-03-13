
import React from 'react';

class Throttle extends React.Component {
  render() {
    console.log('------当前组件是否渲染-----', this.props);
    return <div>hello world, my name is kongzhi</div>
  }
}

export default Throttle;