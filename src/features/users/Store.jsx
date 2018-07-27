import React, { PureComponent } from 'react';
import { auth, googleAuthProvider } from '../../constants/firebase';

export let User = React.createContext();

class UserProvider extends PureComponent {
  componentDidMount() {
    try {
      auth.onAuthStateChanged(user => this.setState({ user }));
    } catch (err) {
      console.log('err', err);
    }
  }

  handleSignIn = () =>
    auth.signInWithPopup(googleAuthProvider).catch(error => console.log(error));

  handleSignout = () => {
    auth.signOut().catch(error => console.log(error));
  };

  state = {
    user: [],
    handleSignIn: this.handleSignIn,
    handleSignout: this.handleSignout
  };

  render() {
    return (
      <User.Provider value={this.state}>{this.props.children}</User.Provider>
    );
  }
}

export default UserProvider;
