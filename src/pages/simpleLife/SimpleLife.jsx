
import React, { Component} from 'react';
import SimplePropsHoc from './SimpleLifeHoc';

@SimplePropsHoc
export default class SimpleLife extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('----didMounted----');
  }
  render() {
    return <div>hello world</div>
  }
}
