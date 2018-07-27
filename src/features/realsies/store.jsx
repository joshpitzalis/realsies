import React, { PureComponent } from 'react';
import { setRealsie, getRealsies, addRealsie } from './helpers';

export let Realsies = React.createContext();

class RealsiesProvider extends PureComponent {
  componentDidMount() {
    getRealsies().then(realsies => this.setState({ realsies }));
  }

  handleSubmit = (to, thing, when) => {
    let id = +new Date();
    let payload = { id, to, thing, when };
    this.setState(setRealsie(payload, false));
    try {
      addRealsie(payload);
    } catch (error) {
      this.setState(setRealsie(payload, true));
    }
  };

  state = {
    realsies: [],
    bobo: 'pickle',
    add: this.add,
    handleSubmit: this.handleSubmit
  };

  render() {
    return (
      <Realsies.Provider value={this.state}>
        {this.props.children}
      </Realsies.Provider>
    );
  }
}

export default RealsiesProvider;
