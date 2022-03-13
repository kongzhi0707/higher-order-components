import React, { Component } from 'react';
import ReverseStateHoc from "./ReverseStateHoc";

@ReverseStateHoc

export default class ReverseState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'kongzhi'
    };
  }
  componentDidMount() {
    console.log('----componentDidMount---');
  }
  render() {
    return <div>welcome to kongzhi</div>
  }
}