
// SimpleRenderHoc.jsx

import React, { Component} from 'react';

const SimpleRenderHoc = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { visible: false }
    }
    setVisible() {
      this.setState({
        visible: !this.state.visible
      })
    }
    render() {
      const { visible } = this.state;
      return <div className="box">
            <button onClick={ this.setVisible.bind(this)}>挂载组件</button>
            { visible ? <WrappedComponent {...this.props} setVisible={this.setVisible.bind(this)} /> : <div className="icon">111</div>}
          </div>
    }
  }
}

export default SimpleRenderHoc;