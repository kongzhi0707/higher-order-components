import React, { Component} from 'react';
import SimplePropsHoc from './SimplePropsHoc.jsx';

@SimplePropsHoc
export default class SimpleProps extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('----props-----', this.props);
    return (
      <div>
        Simple
      </div>
    );
  }
}

// export default simpleHoc(Simple);

