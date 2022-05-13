import React, { useContext } from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GeneralContext } from '../context/GeneralContext';
import AuthRouter from './AuthRouter';
import DashboardRouter from './DashboardRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { SessionContext } from '../context/SessionContext';

const AppRouter = () => {
  const { user } = useContext(GeneralContext);
  const { session } = useContext(SessionContext);
  return (
    // eslint-disable-next-line no-restricted-globals
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={!!session}
          />
          <PrivateRoute
            path="/"
            component={DashboardRouter}
            isAuthenticated={!!session}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
