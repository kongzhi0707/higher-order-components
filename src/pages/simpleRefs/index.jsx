
// index.js

import React from 'react';
import SimpleRefs from './simpleRefs';
import SimpleRefsHoc from './simpleRefsHoc';

// 高阶组件
const EnhanceRefs = SimpleRefsHoc(SimpleRefs);

class OperateRefs extends React.Component {
  render() {
    return <EnhanceRefs name="小明" age={15} />
  }
}

export default OperateRefs;