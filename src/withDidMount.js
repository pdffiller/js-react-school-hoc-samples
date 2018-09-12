import React from 'react';

export const withDidMount = onMount => Component => {
  return class WithDidMount extends React.Component {
    static displayName = `withDidMount(${
      Component.displayName || Component.name
    })`

    componentDidMount() {
      onMount(this.props);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};

export const withBeforeMount = onMount => Component => {
  return class withBeforeMount extends React.Component {
    static displayName = `withBeforeMount(${
      Component.displayName || Component.name
    })`

    componentWillMount() {
      onMount(this.props);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};
