
// SimpleEventHoc.jsx

import React, { Component, useRef, useEffect } from 'react';

const SimpleEventHoc = WrappedComponent => {
  return function Wrap(props) {
    const dom = useRef(null);
    useEffect(()=>{
      const handleClick = () => console.log('发生点击事件');
      dom.current.addEventListener('click', handleClick);
      return () => dom.current.removeEventListener('click', handleClick);
    }, []);
    return <div ref={dom}><WrappedComponent {...props} /></div>
  }
}

export default SimpleEventHoc;