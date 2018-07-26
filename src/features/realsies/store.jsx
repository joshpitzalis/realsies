import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../../constants/firebase';

export let Realsies = React.createContext();

class RealsiesProvider extends PureComponent {
  static Consumer = Realsies.Consumer;
  add = e => {
    e.preventDefault();
    console.log('this');
    return this.setState({
      realsies: [
        {
          id: 1532350333942,
          to: 'f@q',
          thing: 'test thingy',
          when: '2018-07-31'
        },
        ...this.state.realsies
      ]
    });
  };

  state = {
    realsies: [{ a: true }],
    add: this.add
  };

  render() {
    return <Realsies.Provider value={this.state} />;
  }
}

export default RealsiesProvider;
