import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { Container, Card, CardItem, Text, Content } from 'native-base';

import AppBar from './components/AppBar';
import CartItem from './components/CartItem';

export default class App extends Component {
  render() {
    return (
      <Container>
        <AppBar />
        <ScrollView>
          <CartItem />
        </ScrollView>
      </Container>
    );
  }
}
