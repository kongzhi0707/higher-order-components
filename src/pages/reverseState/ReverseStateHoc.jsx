

const ReverseStateHoc = WrappedComponent => {
  const didMount = WrappedComponent.prototype.componentDidMount;
  return class extends WrappedComponent {
    async componentDidMount() {
      if (didMount) {
        await didMount.apply(this);
      }
      // 将state中的name值修改成 tugenhua
      this.setState({
        name: 'tugenhua'
      });
    }
    render() {
      console.log('-----读取state---', this.state);
      return super.render();
    }
  }
}

export default ReverseStateHoc;