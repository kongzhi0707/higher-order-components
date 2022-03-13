import React, { Component} from 'react';

const SimplePropsHoc = WrappedComponent => {
  console.log('-----simpleHoc22----');
  return class extends Component {
    render() {
      const newProps = { type: 'HOC' };
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

export default SimplePropsHoc;