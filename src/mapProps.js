import React from 'react';

export const mapProps = mapper => Component => (
  props => <Component {...mapper(props)} />
);