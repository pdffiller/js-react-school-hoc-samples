import React from 'react';
import { withDidMount, withBeforeMount } from './withDidMount';
import { mapProps } from './mapProps';


const compose = (...fns) => fns.reduce(
  (f, g) => (...args) => f(g(...args))
);

const getDisplayName = (Component, hocName) => (
  `${hocName}(${Component.displayName || Component.name})`
);

const withStyle = style => Component => {
  const newComponent = props => <Component {...props} style={style} />;
  newComponent.displayName = getDisplayName(Component, 'withStyle');
  return newComponent;
};

const withExtra = extra => Component => Object.assign(
  props => <Component {...props} extra={extra} />,
  {
    displayName: getDisplayName(Component, 'withExtra')
  }
);

const Header = ({ children, style, extra }) => (
  <h1 style={style}>
    { children }
    { extra && <span> ({extra})</span>}
  </h1>
);

const SmartHeader = mapProps(
  props => ({
    ...props,
    style: {
      ...props.style,
      color: props.children.indexOf('Hello') >= 0 ? 'blue' : '',
    }
  })
)(Header);

const Content = ({ children }) => (
  <pre>{ children }</pre>
);

const LcContent = compose(
  withDidMount(
    props => console.log('LcContent', props)
  ),
  withBeforeMount(
    () => {
      console.log('LcContnet - before mount');
      debugger;
    }
  )
)(Content);

const enhanceHeader = compose(
  withExtra('Hello World'),
  withStyle({ color: 'green' }),
  withDidMount(
    props => console.log('Mounted with', props)
  ),
);

const StyledHeader = withStyle({ color: 'red' })(Header);

const EnhancedHeader = enhanceHeader(Header);

function App() {
  return (
    <div className="App">
      <Header>Hello CodeSandbox</Header>
      <StyledHeader>Styled Header Content</StyledHeader>
      <EnhancedHeader>Super Puper</EnhancedHeader>
      <SmartHeader>Hello from PDFfiller</SmartHeader>
      <SmartHeader>Hi World</SmartHeader>
      <Content>skdjffasjklhf jksadhf l</Content>
      <LcContent>kashfjkashfdlkj sjkdahfjlkdh lkjhsdf </LcContent>
    </div>
  );
}

export default App;
