import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import AppBar from './components/AppBar';

export default class DetailItem extends Component {
  render() {
    return (
      <Container>
        <AppBar />
        <Content>
          <Text>{this.props.productId}</Text>
        </Content>
      </Container>
    );
  }
}
