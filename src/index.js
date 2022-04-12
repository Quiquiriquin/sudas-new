import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import { GeneralProvider } from './context/GeneralContext';
import { SessionProvider } from './context/SessionContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </SessionProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);

module.hot.accept();
