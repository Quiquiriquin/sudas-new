import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import NiceModal from '@ebay/nice-modal-react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import authReducer from './auth/authReducer';
import {
  GeneralContext,
  GeneralProvider,
} from './context/GeneralContext';
import AppRouter from './routers/AppRouter';
import {
  SessionContext,
  SessionProvider,
} from './context/SessionContext';
import 'react-toastify/dist/ReactToastify.css';
import { getSessionCookie } from './helpers/Sessions';

const App = () => {
  const { themes, selectedTheme, updateUser } =
    useContext(GeneralContext);
  const { updateSession } = useContext(SessionContext);
  const [session, setSession] = useState(getSessionCookie());

  useEffect(() => {
    updateSession(getSessionCookie());
  }, []);

  useEffect(() => {
    return () => {
      setSession(getSessionCookie());
      updateUser(getSessionCookie());
    };
  }, [session]);

  return (
    <ThemeProvider theme={themes[selectedTheme] || themes.teament}>
      <NiceModal.Provider>
        <GeneralProvider>
          <AppRouter />
          <ToastContainer />
        </GeneralProvider>
      </NiceModal.Provider>
    </ThemeProvider>
  );
};

export default App;
