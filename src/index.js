import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import XApp from './XApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/* <XApp /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
registerServiceWorker();
