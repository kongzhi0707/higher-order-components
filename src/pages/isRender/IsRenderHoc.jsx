
import React from 'react';

const IsRenderHoc = config => WrappedComponent => {
  return class extends WrappedComponent {
    render() {
      const { isRender } = config;
      if (isRender) {
        return super.render();
      } else {
        return <div>暂无数据</div>
      }
    }
  }
};

export default IsRenderHoc;