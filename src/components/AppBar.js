import React from 'react';
import { Header, Body, Title, Right, Icon, Left, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

const AppBar = props => {
  const { showBackNav, title } = props;

  return (
    <Header style={{ backgroundColor: '#E40044' }}>
      <Left>
        {showBackNav ? (
          <Button onPress={() => Actions.pop()} transparent>
            <Icon name="arrow-back" />
          </Button>
        ) : (
          <Button onPress={() => alert('Menu')} transparent>
            <Icon name="menu" />
          </Button>
        )}
      </Left>

      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button onPress={() => alert('Cart')} transparent>
          <Icon name="cart" />
        </Button>
      </Right>
    </Header>
  );
};

export default AppBar;
