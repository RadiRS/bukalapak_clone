import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container } from 'native-base';

import AppBar from '../src/components/AppBar';
import CartItem from '../src/components/CartItem';

export default class ListItemForm extends Component {
  render() {
    return (
      <Container>
        <AppBar />
        <ScrollView>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </ScrollView>
      </Container>
    );
  }
}
