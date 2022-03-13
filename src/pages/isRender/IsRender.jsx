

import React from 'react';
import IsRenderHoc from './IsRenderHoc';

@IsRenderHoc({isRender: true})
class IsRender extends React.Component {
  render() {
    return <div>
      <p>hello, my name is kongzhi</p>
    </div>
  }
}

export default IsRender;