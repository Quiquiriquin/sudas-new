import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './utils/isAuthenticated';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const render = (props) => {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
