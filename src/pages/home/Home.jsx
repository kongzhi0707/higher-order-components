import React, { Component} from 'react';
import store from '@store';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState().count
    };
    store.subscribe(() => {
      const { counter } = store.getState();
      // 使用setState 重新渲染页面
      console.log('----store----', store.getState());
      this.setState({
        count: counter.count
      });
    });
  }
  onIncrement = () => {
    // 触发dispatch事件
    setTimeout(() => {
      store.dispatch({ type: 'counter/add' });
    }, 100);
    // store.dispatch({ type: 'counter/add' });
  }
  minus = () => {
    // 触发dispatch事件
    store.dispatch({ type: 'counter/minus' });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <p onClick={this.onIncrement}>increment</p>
        <p onClick={this.minus}>minus</p>
        <p>计数器的值：{this.state.count}</p>
      </div>
    );
  }
}

