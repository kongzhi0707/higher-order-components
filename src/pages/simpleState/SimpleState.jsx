
import React, { Component} from 'react';
import SimpleStateHoc from './SimpleStateHoc.jsx';

@SimpleStateHoc
export default class SimpleState extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('----this.props.name----', this.props.name);
    return <input name="name" {...this.props.name} />
  }
};