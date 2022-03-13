
### 深入理解高阶组件及其应用场景

- [x] [ 什么是高阶组件？](#id1) <br/>
- [x] [高阶组件的优点？](#id2) <br/>
- [x] [属性代理 (Props Proxy)](#id3) <br/>

- [x] [属性代理-操作props](#id4) <br/>
- [x] [属性代理-抽象state](#id5) <br/>

- [x] [属性代理-获取refs引用](#id6) <br/>
- [x] [属性代理-获取原组件的static方法](#id7) <br/>

- [x] [属性代理-劫持原型链-劫持生命周期](#id8) <br/>
- [x] [属性代理-组件内的事件监听](#id9) <br/>

- [x] [属性代理-动态渲染](#id10) <br/>
- [x] [反向继承(Inheritance Inversion)](#id11) <br/> 

- [x] [反向继承-读取/操作原组件的state](#id12) <br/>
- [x] [反向继承-渲染劫持](#id13)<br/>
- [x] [反向继承-修改渲染树](#id14)<br/>
- [x] [反向继承-节流渲染](#id15)<br/>

#### <div id="id1">1. 什么是高阶组件？</div>

高阶组件(HOC, Higher-Order Components) 不是组件，而是一个函数，它接收一个组件作为参数并返回一个经过改造后的新组件。
用代码解释如下：
```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
如上代码，通过higherOrderComponent函数，它接收一个WrappedComponent组件作为参数，并且返回的EnhancedComponent就是一个高阶组件。

#### <div id="id2">2. 高阶组件的优点？</div>

1. 代码复用：组件是React中最小单元，两个相似度很高的组件通过将组件重复部分抽取出来，再通过高阶组件扩展，增删改props，可以达到组件可复用的目的。
2. 控制渲染：控制组件的渲染逻辑(渲染劫持)。我们可以对原来的组件进行条件渲染/节流渲染/懒加载等功能。常见的场景 多个case 权限控制。
3. 生命周期捕获/劫持：借助父组件子组件生命周期规则捕获子组件的生命周期。常见的应用场景：渲染性能追踪/日志打点。

#### <div id="id3">3. 高阶组件的实现方式有哪几种？</div>

实现高阶组件有以下两种方式：

1. 属性代理(Props Proxy)
2. 反向继承(Inheritance Inversion)

#### 3.1）属性代理 (Props Proxy)

最简单的属性代理实现如下：
```
// 返回一个无状态的函数组件
function HigherOrderComponent(WrappedComponent) {
  const newProps = { type: 'HOC' };
  return props => <WrappedComponent {...props} {...newProps} />;
}

// 返回一个有状态的class组件, class组件是有状态的，因为它是class组件有自己的实例，而上面的纯函数组件是无状态的组件
function HigherOrderComponent(WrappedComponent) {
  return class extends React.Component {
    render() {
      const newProps = { type: 'HOC' };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  }
}
```
如上代码，通过属性代理方式实现的高阶组件包装后的组件，可以拦截到父组件传递过来的props，提前对props进行一些操作，比如上面增加一个type属性等。

如上代码，属性代理其实就是一个函数接收一个 WrappedComponent 组件作为参数传入，并返回一个继承了 React.Component组件的类，且在该类的 render()方法中返回被传入的WrappedComponent组件。

#### <div id="id4">1）操作props</div>

下面我们来看一个最简单的属性代理的高阶组件的demo：
```
// SimpleProps.jsx 代码如下：

import React, { Component} from 'react';
import SimplePropsHoc from './SimplePropsHoc.jsx';
class SimpleProps extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('----props-----', this.props);
    return (
      <div>
        Simple
      </div>
    );
  }
}
export default SimplePropsHoc(SimpleProps);
```
```
// SimplePropsHoc.jsx 代码如下：
import React, { Component} from 'react';
const SimplePropsHoc = WrappedComponent => {
  console.log('-----SimplePropsHoc----');
  return class extends Component {
    render() {
      const newProps = { type: 'HOC' };
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}
export default SimplePropsHoc;
```
如上代码，组件 SimpleProps 通过 SimplePropsHoc的包装，上面的simplePropsHoc就是一个高阶组件。它通过接收一个 class SimpleProps组件作为参数，并且返回一个class组件。并且新增了一个新props属性 { type: 'HOC' }。

如上代码，我们也可以改成使用装饰器模式来简化代码，代码如下：

#### 装饰器模式简化

高阶组件可以看作是装饰器模式在React中的实现，即允许向一个现有的对象添加新的功能，同时又不改变其结构。ES7中添加了一个 decoration的属性，使用@符号表示。
代码改成如下：
```
// SimpleProps.jsx 代码如下：
import React, { Component} from 'react';
import SimplePropsHoc from './SimplePropsHoc.jsx';

@SimplePropsHoc
export default class SimpleProps extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('----props-----', this.props);
    return (
      <div>
        Simple
      </div>
    );
  }
}

// export default simplePropsHoc(Simple);
```
```
// SimplePropsHoc.jsx 代码如下：

import React, { Component} from 'react';
const SimplePropsHoc = WrappedComponent => {
  console.log('-----simpleHoc22----');
  return class extends Component {
    render() {
      const newProps = { type: 'HOC' };
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}
export default SimplePropsHoc;
```

如上代码，运行后，同样可以执行和打印出信息出来。但是装饰器模式不是所有浏览器都兼容的，一般我们需要通过babel去编译的，可以使用 babel中的transform-decorators-legacy插件去编译下。

如下图

<img src="https://raw.githubusercontent.com/kongzhi0707/higher-order-components/master/images/0.png" /> <br />

下载项目后，运行 http://localhost:8083/props 可以看到效果。

#### <div id="id5">2）抽象state</div>

注意：通过属性代理方式实现的高阶组件无法直接操作原组件的state，但是我们可以通过props和回调函数对state进行抽象。

如下代码
```
// SimpleStateHoc.jsx 代码如下：
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
```
```
// SimpleState.jsx 代码如下：

import React, { Component} from 'react';
import SimpleStateHoc from './SimpleStateHoc.jsx';

@SimpleStateHoc
export default class SimpleState extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('----this.props.name----', this.props.name);
    return <input name="name" {...this.props.name} />
  }
};
```
如上代码，当我们在输入框输入1的时候，会在控制台打印如下信息：

<img src="https://raw.githubusercontent.com/kongzhi0707/higher-order-components/master/images/1.png" /> <br />

如上代码，通过props，回调函数 传递给 WrappedComponent组件，通过回调函数获取state，SimpleState.jsx 代码中input就是受控的，当改变value的时候，用onChange事件同步到 state 中。用到最多的地方就是form表单中的受控组件。

下载项目后，运行 http://localhost:8083/state 可以看到效果。

#### <div id="id6">3）获取refs引用</div>

为了访问 DOM element (比如focus事件，或需要使用DOM操作等)，有时候我们会使用到组件的ref属性。ref属性只能声明在class类型的组件上，不能声明在函数类型的组件上，因为函数类型的组件它没有状态，也就是说没有实例。

上面的属性代理方式实现的高阶组件无法直接获取原组件的refs的引用，但是我们可以通过在原组件的ref回调函数中调用父组件传入的ref回调函数来获取原组件的refs的引用。

下面我们来看一个demo代码来理解下：

simpleRefs.jsx 代码如下：
```
// simpleRefs.jsx
import React, { Component } from 'react';
export default class SimpleRefs extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.inputElement = null;
  }
  static sayHello() {
    console.log('hello world');
  }
  state = {
    name: '',
    age: 0
  };
  componentDidMount() {
    this.setState({
      name: this.props.name,
      age: this.props.age,
    });
  }
  onChange = (e) => {
    this.setState({
      age: e.target.value,
    });
  }
  focus = () => {
    this.inputElement.focus();
  }
  render() {
    return (
      <div>
        <div>姓名：{this.state.name}</div>
        <div>
          年龄: <input value={this.state.age} onChange={this.onChange} type="number" ref={input => {
            console.log('----input---', input);
            console.log('-----父组件props----', this.props);
            if (this.props.inputRef) {
              this.props.inputRef(input); // 调用父组件传入的ref回调函数
            }
            this.inputElement = input;
          }}/>
        </div>
        <div>
          <button onClick={this.focus}>获取输入框焦点</button>
        </div>
      </div>
    )
  }
}
```
```
// simpleRefsHoc.jsx 代码如下：
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
```
// 调用代码如下：
```
// index.js
import React from 'react';
import SimpleRefs from './simpleRefs';
import SimpleRefsHoc from './simpleRefsHoc';

// 高阶组件
const EnhanceRefs = SimpleRefsHoc(SimpleRefs);

class OperateRefs extends React.Component {
  render() {
    return <EnhanceRefs name="小明" age={15} />
  }
}
export default OperateRefs;
```
如上index.js中的代码，通过高阶组件包装后的 EnhanceRefs 组件可以访问到 SimpleRefs 组件的 input元素。初始化效果如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/higher-order-components/master/images/2.png" /> <br />

如上 index.js 代码，渲染包装后的高阶组件 EnhanceRefs，传递二个参数 name 和 age，然后调用父组件 SimpleRefsHoc 方法inputRef给子组件 SimpleRefs，
然后在子组件 SimpleRefs 中以input元素作为参数传递给父组件的方法中 this.props.inputRef(input); 父组件 SimpleRefsHoc中以inputElement变量保存在
全局中，因此当我点击 "获取子组件输入框焦点" 按钮后，就可以在当前父组件中拿到input元素到。

下载项目后，运行 http://localhost:8083/refs 可以看到效果。

#### <div id="id7">4）获取原组件的static方法</div>

还是以上面的代码为列，在SimpleRefsHoc.jsx组件中，代码如下：
```
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
```
当我们点击 "调用子组件static" 按钮时，会调用 wrappedComponentStaic 方法，然后调用 原组件的静态方法 sayHello函数。

#### <div id="id8">5）劫持原型链-劫持生命周期</div>

SimpleLife.jsx 代码如下：
```
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
```
SimpleLifeHoc.jsx 代码如下：
```
// SimpleLifeHoc.jsx

import React, { Component} from 'react';

const SimpleLifeHoc = WrappedComponent => {
  const propDidMount = WrappedComponent.prototype.componentDidMount;
  WrappedComponent.prototype.componentDidMount = function() {
    console.log('劫持生命周期: componentDidMount');
    console.log('---this---', this);
    propDidMount.call(this);
  }
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default SimpleLifeHoc;
```
执行效果如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/higher-order-components/master/images/3.png" /> <br />

如上代码，在SimpleLifeHoc组件中，对传入的WrappedComponent组件，也就是原组件 SimpleLife.jsx，然后对原组件的生命周期 的 prototype 中的生命周期 componentDidMount 进行劫持。

下载项目后，运行 http://localhost:8083/life 可以看到效果。

#### <div id="id9">6）组件内的事件监听</div>

我们可以使用高阶组件内的点击事件做一个监听效果。
```
// SimpleEvent.jsx 代码如下

import React from 'react';
import SimpleEventHoc from './SimpleEventHoc';

@SimpleEventHoc
export default class SimpleEvent extends React.Component {
  render() {
    return (
      <div>
        <p>hello, world</p>
        <button>组件内部点击事件</button>
      </div>
    )
  }
}
```
```
// SimpleEventHoc.jsx 代码如下

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
```
点击 "组件内部点击事件" 后，效果如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/higher-order-components/master/images/3.png" /> <br />

下载项目后，运行 http://localhost:8083/event 可以看到效果。

#### <div id="id10">7）动态渲染</div>

属性代理的高阶组件，可以在外层控制当前组件是否渲染。下面实现一个动态挂载组件的高阶组件。

SimpleRender.jsx 代码如下：
```
import React from 'react';
import SimpleRenderHoc from './SimpleRenderHoc';

@SimpleRenderHoc
class SimpleRender extends React.Component {
  render() {
    const { setVisible } = this.props;
    return <div>
      <p>hello, my name is kongzhi</p>
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&fm=26&gp=0.jpg" />
      <button onClick={() => setVisible()}>卸载当前组件</button>
    </div>
  }
}

export default SimpleRender;
```
SimpleRenderHoc.jsx 代码如下：
```
// SimpleRenderHoc.jsx
import React, { Component} from 'react';

const SimpleRenderHoc = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { visible: false }
    }
    setVisible() {
      this.setState({
        visible: !this.state.visible
      })
    }
    render() {
      const { visible } = this.state;
      return <div className="box">
            <button onClick={ this.setVisible.bind(this)}>挂载组件</button>
            { visible ? <WrappedComponent {...this.props} setVisible={this.setVisible.bind(this)} /> : <div className="icon">111</div>}
          </div>
    }
  }
}

export default SimpleRenderHoc;
```
下载项目后，运行 http://localhost:8083/render 可以看到效果。


#### <div id="id11">3.2）反向继承(Inheritance Inversion)</div>

反向继承指是使用一个函数接收一个组件作为参数传入，并返回一个继承了该传入组件的类组件，且在返回组件的 render()方法中返回 super.render()方法。

简单的代码如下：
```
const HOC = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
}
```
#### 和属性代理对比：

1）反向继承实现的高阶组件允许通过 this 访问到原组件，因此可以直接读取和操作原组件的 state/props/ref/生命周期方法。
2）反向继承最大特点可对组件进行渲染劫持。它可以通过 super.render()方法获取到传入组件实例的render结果。

注意：属性代理和反向继承的实现有些地方是相似的，都是返回了一个继承某个父类的子类，只不过属性代理中继承的是 React.Component, 反向继承中继承的是传入的组件WrappedComponent.

#### <div id="id12">1）读取/操作原组件的state</div>

ReverseState.jsx 代码如下：
```
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
```
ReverseStateHoc.jsx 代码如下：
```
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
```
执行结果如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/higher-order-components/master/images/5.png" /> <br />

下载项目后，运行 http://localhost:8083/reverse 可以看到效果。

如上代码，第一次执行后，ReverseStateHoc组件能读取原组件 ReverseState 中的state的值，第二次执行 componentDidMount 生命周期，先调用原组件的
componentDidMount的代码，然后重新使用 setState 改变name值，第二次打印 读取state的值就是修改后的值了。

也就是说，反向继承的高阶组件其实继承的是原组件，因此直接操作state，就是原组件的state。

#### <div id="id13">2）渲染劫持</div>

反向继承中的HOC定义的组件继承了 WrappedComponent 的 render(渲染)，因此我们可以进行劫持，也就是控制它的render函数。

#### 2.1）条件渲染

isRender.jsx 代码如下：
```
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
```
isRenderHoc.jsx 代码如下：
```
import React from 'react';

const IsRenderHoc = config => WrappedComponent => {
  return class extends WrappedComponent {
    render() {
      const { isRender } = config;
      if (isRender) {
        return super.render();
      } else {
        return <div>暂无数据</div>
      }
    }
  }
};

export default IsRenderHoc;
```
#### <div id="id14">2.2）修改渲染树</div>

修改渲染状态(劫持render替换子节点)

RenderTree.jsx 代码如下：
```
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
```
RenderTreeHoc.jsx 代码如下：
```
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
```
实现效果如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/higher-order-components/master/images/6.png" /> <br />

下载项目后，运行 http://localhost:8083/rendertree 可以看到效果。

如上代码，用劫持渲染的方式，来操纵 super.render()后的 React.element元素。

#### <div id="id15">2.3）节流渲染</div>

HOC可以配合hooks的useMemo等API使用，可以实现对业务组件的渲染控制，减少渲染次数，从而达到优化性能的效果。如下代码，我们期望当且仅当num改变的时候，渲染组件，但是不影响接收props。

Throttle.jsx 代码如下：
```
import React from 'react';

class Throttle extends React.Component {
  render() {
    console.log('------当前组件是否渲染-----', this.props);
    return <div>hello world, my name is kongzhi</div>
  }
}

export default Throttle;
```
ThrottleHoc.jsx 代码如下：
```
import React, { useMemo } from 'react';

const ThrottleHoc = WrappedComponent => {
  return function renderWrapComponent(props) {
    const { num1 } = props;
    const RenderElement = useMemo(() => <WrappedComponent {...props} />, [ num1 ]);
    return RenderElement;
  }
}

export default ThrottleHoc;
```
IndexThrottle.jsx 代码如下：
```
import Throttle from './Throttle';
import ThrottleHoc from './ThrottleHoc';

const IndexHoc = ThrottleHoc(Throttle);

export default () => {
  const [num1, setNumber1] = useState(0);
  const [num2, setNumber2] = useState(0);
  const [num3, setNumber3] = useState(0);

  return <div>
    <IndexHoc num1={num1} num2={num2} num3={num3} />
    <button onClick={() => setNumber1(num1 + 1)}>num1++</button>
    <button onClick={() => setNumber2(num2 + 1)}>num2++</button>
    <button onClick={() => setNumber3(num3 + 1)}>num3++</button>
  </div>
}
```
如上代码，当我们点击 第一个按钮时候，num1值自增后才会重新渲染子组件，其他按钮点击不会重新渲染，只是负责了传递props。

下载项目后，运行 http://localhost:8083/throttle 可以看到效果。

#### 4）属性代理和反向继承的对比
```
功能列表                     属性代理             反向继承
原组件能否被包裹              能                    能
原组件能否被继承              不能                  能
能否操作原组件props           能                    能
能否操作原组件state           不能                  能
能否使用ref访问原组件dom元素   不能                  能
能否影响原组件某些生命周期方法   能                   能
是否获取到原组件static方法     能                   能
能否劫持原组件的生命周期防范    不能                  能
能否渲染劫持                  不能                 能
```
可以看到，通过反向继承方法实现的高阶组件相较于属性代理实现的高阶组件，功能更强大，个性化程度更高，因此能适应更多的场景。