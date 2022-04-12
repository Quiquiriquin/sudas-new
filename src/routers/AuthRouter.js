import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import LoginScreen from '../components/Auth/LoginScreen';
import RegisterScreen from '../components/Auth/RegisterScreen';
import AuthContainer from '../components/Auth/AuthContainer';

const AuthRouter = () => {
  const { url, path } = useRouteMatch();
  console.log(url, path);
  return (
    <>
      <Switch>
        <Route path={path} component={AuthContainer} />
        {/* <Route path="/auth/login" component={LoginScreen} /> */}
        {/* <Route path="/auth/register" component={RegisterScreen} /> */}
        <Redirect to="/auth/login" />
      </Switch>
    </>
  );
};

export default AuthRouter;
