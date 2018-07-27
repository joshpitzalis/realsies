import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import RealsiesProvider from './features/realsies/Store';
import UserProvider from './features/users/Store';

ReactDOM.render(
  <React.StrictMode>
    <RealsiesProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </RealsiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();
