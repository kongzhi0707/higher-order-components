
import React from 'react';
import RenderTreeHoc from './RenderTreeHoc';

@RenderTreeHoc
class RenderTree extends React.Component {
  render() {
    return (<div>
      <ul>
        <li>react</li>
        <li>vue</li>
        <li>Angural</li>
      </ul>
    </div>)
  }
}

export default RenderTree;