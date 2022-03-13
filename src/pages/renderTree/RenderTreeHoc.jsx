import React from 'react';

const RenderTreeHoc = WrappedComponent => {
  return class extends WrappedComponent {
    render() {
      const element = super.render();
      const otherProps = {
        name: 'kongzhi'
      };
      // 替换第三个节点
      const appendElement = React.createElement('li', {}, `hello world, my name is ${otherProps.name}`);
      const newChild = React.Children.map(element.props.children.props.children, (child, index) => {
        if (index === 2) return appendElement;
        return child;
      })
      return React.cloneElement(element, element.props, newChild);
    }
  }
}

export default RenderTreeHoc;