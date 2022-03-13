
import React, { useMemo } from 'react';

const ThrottleHoc = WrappedComponent => {
  return function renderWrapComponent(props) {
    const { num1 } = props;
    const RenderElement = useMemo(() => <WrappedComponent {...props} />, [ num1 ]);
    return RenderElement;
  }
}

export default ThrottleHoc;