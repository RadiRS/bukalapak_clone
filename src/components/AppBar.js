import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Body, Title, Right, Icon, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default function AppBar() {
  return (
    <Header>
      <Left>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Icon name="arrow-back" style={{ color: 'white' }} />
        </TouchableOpacity>
      </Left>
      <Body>
        <Title>List Barang</Title>
      </Body>
      <Right>
        <Icon name="cart" />
      </Right>
    </Header>
  );
}
