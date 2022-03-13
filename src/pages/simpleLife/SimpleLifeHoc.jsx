
// SimpleLifeHoc.jsx

import React, { Component} from 'react';

const SimpleLifeHoc = WrappedComponent => {
  const propDidMount = WrappedComponent.prototype.componentDidMount;
  WrappedComponent.prototype.componentDidMount = function() {
    console.log('劫持生命周期: componentDidMount');
    console.log('---this---', this);
    propDidMount.call(this);
  }
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default SimpleLifeHoc;