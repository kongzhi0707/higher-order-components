// simpleRefs.jsx

import React, { Component } from 'react';

export default class SimpleRefs extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.inputElement = null;
  }
  static sayHello() {
    console.log('hello world');
  }
  state = {
    name: '',
    age: 0
  };
  componentDidMount() {
    this.setState({
      name: this.props.name,
      age: this.props.age,
    });
  }
  onChange = (e) => {
    this.setState({
      age: e.target.value,
    });
  }
  focus = () => {
    this.inputElement.focus();
  }
  render() {
    return (
      <div>
        <div>姓名：{this.state.name}</div>
        <div>
          年龄: <input value={this.state.age} onChange={this.onChange} type="number" ref={input => {
            console.log('----input---', input);
            console.log('-----父组件props----', this.props);
            if (this.props.inputRef) {
              this.props.inputRef(input); // 调用父组件传入的ref回调函数
            }
            this.inputElement = input;
          }}/>
        </div>
        <div>
          <button onClick={this.focus}>获取输入框焦点</button>
        </div>
      </div>
    )
  }
}