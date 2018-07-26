import React, { PureComponent, Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import { Button, Input, DatePicker } from 'antd';
import PropTypes from 'prop-types';
// import { User } from './stores/Users';
// import RealsiesProvider from './stores/Realsies';
import { auth, googleAuthProvider } from './constants/firebase';
import { addRealsie, setRealsie } from './features/realsies/helpers';

import { Action, State, withStatechart } from 'react-automata';

let statechart = {
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOGGED_IN: 'loggedIn',
        ERROR: 'error'
      },
      onEntry: 'auth'
    },
    loggedIn: {
      on: {
        LOGGED_OUT: 'loggedOut'
      }
    },
    loggedOut: {
      on: {
        LOGGED_IN: 'loggedIn'
      }
    },
    error: {
      on: {
        LOGGED_IN: 'loggedIn'
      }
    }
  }
};

class App extends PureComponent {
  state = {
    user: false,
    realsies: [],
    to: null,
    thing: null,
    when: null,
    onTextChange: this.onTextChange,
    onDateChange: this.onDateChange,
    handleSubmit: this.handleSubmit
  };

  auth = () => {
    try {
      auth.onAuthStateChanged(user => this.props.transition('LOGGED_IN'));
    } catch (payload) {
      this.props.transition('ERROR', { payload });
    }
  };

  handleSignIn = () =>
    auth
      .signInWithPopup(googleAuthProvider)
      .then(() => this.props.transition('LOGGED_IN'))
      .catch(payload => this.props.transition('ERROR', { payload }));

  handleSignout = () => {
    auth
      .signOut()
      .then(() => this.props.transition('LOGGED_OUT'))
      .catch(payload => this.props.transition('ERROR', { payload }));
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
    // }
    // catch {
    //   this.setState(setRealsie(payload, true));
    // }
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <main className="mw6 center">
          <State value="loading">
            <h1>Loading...</h1>
          </State>
          <State value="error">
            <h1>Oh, snap!</h1>
            <p>{this.props.payload}</p>
          </State>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Realsies</h1>
          </header>
          <State value="loggedIn">
            <Fragment>
              <Button type="danger" onClick={this.handleSignout}>
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
                <input
                  data-testid="to"
                  placeholder="to"
                  value={this.state.to}
                  onChange={e => this.onTextChange('to', e.target.value)}
                  autoFocus
                />
                <input
                  data-testid="thing"
                  placeholder="thing"
                  value={this.state.thing}
                  onChange={e => this.onTextChange('thing', e.target.value)}
                />
                <DatePicker data-testid="when" onChange={this.onDateChange} />

                <input data-testid="submit" type="submit" value="send" />
              </form>

              <Fragment>
                {this.state.realsies &&
                  this.state.realsies.map(item => (
                    <ul key={item.id}>
                      <li>
                        <div>{item.thing}</div>
                        <div>{item.to}</div>
                        <div>{item.when}</div>
                      </li>
                      <button>Submit</button>
                    </ul>
                  ))}
              </Fragment>
            </Fragment>
          </State>
          <State value="loggedOut">
            <Button
              data-testid="login"
              type="primary"
              onClick={this.handleSignIn}
            >
              Signup/Login
            </Button>
          </State>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.bool.isRequired
};

export default withStatechart(statechart)(App);
