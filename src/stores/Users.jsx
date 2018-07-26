import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../constants/firebase';

export let User = React.createContext();

class UserProvider extends PureComponent {
  state = { user: true };

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: !!user }));
  }

  render() {
    return (
      <User.Provider value={this.state}>{this.props.children}</User.Provider>
    );
  }
}

export default UserProvider;
