import React, { Component } from 'react';
import { Root } from 'native-base';

import Router from './Router';

export default class App extends Component {
  render() {
    return (
      <Root>
        <Router />
      </Root>
    );
  }
}
