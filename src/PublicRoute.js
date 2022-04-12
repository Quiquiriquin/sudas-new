import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './utils/isAuthenticated';

const PublicRoute = ({
  component: Component,
  restricted = false,
  ...rest
}) => {
  const render = (props) => {
    if (isAuthenticated() && restricted) {
      return <Redirect to="/dashboard" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
};

export default PublicRoute;
