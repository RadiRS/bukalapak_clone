import React from 'react';
import { Header, Body, Title, Right, Icon } from 'native-base';

export default function AppBar() {
  return (
    <Header>
      <Body>
        <Title>List Barang</Title>
      </Body>
      <Right>
        <Icon name="cart" />
      </Right>
    </Header>
  );
}
