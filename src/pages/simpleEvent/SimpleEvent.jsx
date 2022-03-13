
import React from 'react';
import SimpleEventHoc from './SimpleEventHoc';

@SimpleEventHoc
export default class SimpleEvent extends React.Component {
  render() {
    return (
      <div>
        <p>hello, world</p>
        <button>组件内部点击事件</button>
      </div>
    )
  }
}