import React from 'react';

import { Realsies } from './realsies/Store';
import { User } from './users/Store';
// export default props => (
//   <Realsies.Consumer>
//     {store => (
//       <User.Consumer>
//         {userStore => <App realsies={store} user={userStore} />}
//       </User.Consumer>
//     )}
//   </Realsies.Consumer>
// );

// The example above is the 'normal' way to export a component woth two different context wrappers but its looks a little messy so I lets wrap them in a single higher order component, Below...

// This function takes a component...
export function withContext(Component) {
  // ...and returns another component...
  return function ContextComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <Realsies.Consumer>
        {realsiesStore => (
          <User.Consumer>
            {userStore => (
              <Component {...props} realsies={realsiesStore} user={userStore} />
            )}
          </User.Consumer>
        )}
      </Realsies.Consumer>
    );
  };
}
