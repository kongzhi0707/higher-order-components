// simpleRefsHoc.jsx

import React, { Component} from 'react';

function SimpleRefsHoc(WrappedComponent) {
  let inputElement = null;
  function handleClick() {
    console.log('-----handleClick----', inputElement);
    inputElement.focus();
  }
  function wrappedComponentStaic() {
    console.log('----wrappedComponentStaic---', WrappedComponent);
    WrappedComponent.sayHello();
  }
  return(props) => {
    return (
      <div>
        <WrappedComponent inputRef={el => inputElement = el } {...props} />
        <input type="button" value="获取子组件输入框焦点" onClick={handleClick} />
        <input type="button" value="调用子组件static" onClick={wrappedComponentStaic} />
      </div>
    )
  }
}

export default SimpleRefsHoc;