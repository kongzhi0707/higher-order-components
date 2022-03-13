import React, { Component} from 'react';

const SimpleStateHoc = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
      this.onChange = this.onChange.bind(this);
    }
    onChange = (e) => {
      this.setState({
        name: e.target.value,
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onChange,
        }
      };
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

export default SimpleStateHoc;