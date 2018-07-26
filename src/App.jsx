import React, { PureComponent, Fragment } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import { TextInputField, Button, Heading, ListItem } from 'evergreen-ui';
import PropTypes from 'prop-types';
// import { User } from './stores/Users';
// import RealsiesProvider from './stores/Realsies';
import { db } from './constants/firebase';

import { auth, googleAuthProvider } from './constants/firebase';
import {
  addRealsie,
  setRealsie,
  getRealsies
} from './features/realsies/actions';

class App extends PureComponent {
  state = {
    user: false,
    realsies: [],
    to: '',
    thing: '',
    when: '',
    onTextChange: this.onTextChange,
    onDateChange: this.onDateChange,
    handleSubmit: this.handleSubmit
  };

  componentDidMount() {
    try {
      auth.onAuthStateChanged(user => this.setState({ user }));
    } catch (err) {
      console.log('err', err);
    }
    getRealsies().then(realsies => this.setState({ realsies }));
  }

  handleSignIn = () =>
    auth.signInWithPopup(googleAuthProvider).catch(error => console.log(error));

  handleSignout = () => {
    auth.signOut().catch(error => console.log(error));
  };

  onTextChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onDateChange = (date, dateString) => {
    this.setState({ when: dateString });
  };

  handleSubmit = (to, thing, when) => {
    let id = +new Date();
    let payload = { id, to, thing, when };
    this.setState(setRealsie(payload, false));
    // try {
    addRealsie(payload);
    // } catch (error) {
    //   this.setState(setRealsie(payload, true));
    // }
  };

  render() {
    return (
      <div className="App">
        <main className="mw6 center">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Heading>Realsies</Heading>
          </header>
          {this.state.user ? (
            <Fragment>
              <Button onClick={this.handleSignout} appearance="red">
                Logout
              </Button>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(
                    this.state.to,
                    this.state.thing,
                    this.state.when
                  );
                }}
              >
                <TextInputField
                  data-testid="to"
                  label="to"
                  description="The email of the person you want to send to goes above."
                  placeholder="to"
                  value={this.state.to}
                  onChange={e => this.onTextChange('to', e.target.value)}
                  autoFocus
                  required
                />
                <TextInputField
                  data-testid="thing"
                  label="thing"
                  description="What you promise to send this person."
                  placeholder="thing"
                  value={this.state.thing}
                  onChange={e => this.onTextChange('thing', e.target.value)}
                  required
                />

                <DatePicker data-testid="when" onChange={this.onDateChange} />

                <input data-testid="submit" type="submit" value="send" />
              </form>

              <Fragment>
                {this.state.realsies &&
                  this.state.realsies.map(item => (
                    <ul key={item.id}>
                      <ListItem>
                        <div>{item.thing}</div>
                        <div>{item.to}</div>
                        <div>{item.when}</div>
                      </ListItem>
                      <button>Submit</button>
                    </ul>
                  ))}
              </Fragment>
            </Fragment>
          ) : (
            <Button
              data-testid="login"
              type="primary"
              onClick={this.handleSignIn}
            >
              Signup/Login
            </Button>
          )}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.bool.isRequired
};

export default App;
