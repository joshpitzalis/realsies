import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import RealsiesProvider from './features/realsies/Store';
import UserProvider from './features/users/Store';

class Providers extends PureComponent {
  render() {
    return (
      <div>
        <RealsiesProvider>
          <UserProvider>{this.props.children}</UserProvider>
        </RealsiesProvider>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();
