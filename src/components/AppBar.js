import React from 'react';
import { Header, Body, Title, Right, Icon, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

const AppBar = props => {
  const { showBackNav = true, showCartNav = true, title } = props;

  return (
    <Header transparent style={{ backgroundColor: '#E40044' }}>
      <Left style={{ flex: 1 }}>
        {showBackNav ? (
          <Button
            onPress={() => Actions.pop()}
            transparent
            transparent={true}
            iconName="arrow-back"
          />
        ) : (
          <Button
            onPress={() => alert('Menu')}
            transparent
            transparent={true}
            iconName="menu"
          />
        )}
      </Left>
      <Body style={{ flex: 1, alignItems: 'center' }}>
        <Title>{title}</Title>
      </Body>
      <Right style={{ flex: 1 }}>
        {showCartNav ? (
          <Button
            onShow={true}
            onPress={() => Actions.cartList()}
            transparent={true}
            iconName="cart"
          />
        ) : null}
      </Right>
    </Header>
  );
};

export default AppBar;
