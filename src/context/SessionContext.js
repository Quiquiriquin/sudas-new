import React, { useState } from 'react';
import { getSessionCookie } from '../helpers/Sessions';

const SessionContext = React.createContext();
const { Provider, Consumer } = SessionContext;

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(getSessionCookie());

  return (
    <Provider
      value={{
        session,
        updateSession: setSession,
      }}
    >
      {children}
    </Provider>
  );
};

export {
  SessionProvider,
  Consumer as GeneralConsumer,
  SessionContext,
};
