import React, { PureComponent, Fragment } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import { TextInputField, Button, Heading, ListItem } from 'evergreen-ui';
import PropTypes from 'prop-types';
import { Realsies } from './features/realsies/Store';
import { User } from './features/users/Store';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      thing: '',
      when: ''
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onTextChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onDateChange = (date, dateString) => {
    this.setState({ when: dateString });
  };

  render() {
    return (
      <div className="App">
        <main className="mw6 center">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Heading>Realsies</Heading>
          </header>

          {this.props.user.user ? (
            <Fragment>
              <Button onClick={this.props.user.handleSignout} appearance="red">
                Logout
              </Button>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.realsies.handleSubmit(
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
                {this.props.realsies.realsies &&
                  this.props.realsies.realsies.map(item => (
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
              onClick={this.props.user.handleSignIn}
            >
              Signup/Login
            </Button>
          )}
        </main>
      </div>
    );
  }
}

export default props => (
  <Realsies.Consumer>
    {store => (
      <User.Consumer>
        {userStore => <App realsies={store} user={userStore} />}
      </User.Consumer>
    )}
  </Realsies.Consumer>
);
