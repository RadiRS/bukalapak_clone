import React from 'react';
import { Header, Body, Title, Right, Badge, Left, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

// Data Services
import { getProducts } from '../services/fakeCartServices';

const AppBar = props => {
  const { showBackNav = true, showCartNav = true, title, cart } = props;
  // const cart = getProducts().length;

  return (
    <Header
      androidStatusBarColor="#E40044"
      transparent
      style={{ backgroundColor: '#E40044' }}
    >
      <Left style={{ flex: 1 }}>
        {showBackNav ? (
          <Button
            onPress={() => Actions.popTo('productList')}
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
      <Right style={{ flex: 1 }}>{renderCartButton(showCartNav, cart)}</Right>
    </Header>
  );
};

const renderCartButton = (showCartNav, cart) => {
  if (showCartNav) {
    return (
      <>
        <Button
          onShow={true}
          onPress={() => alert('Search')}
          transparent={true}
          iconName="search"
        />
        <Button
          onShow={true}
          onPress={() => alert('log-in')}
          transparent={true}
          iconName="log-out"
        />
        <Button
          onShow={true}
          onPress={() => Actions.cartList()}
          transparent={true}
          iconName="cart"
          mg={5}
        />
        <Badge
          style={{ position: 'absolute', backgroundColor: '#FDD938' }}
          warning
        >
          <Text style={{ color: '#E40044' }}>{cart}</Text>
        </Badge>
      </>
    );
  }
};

export default AppBar;
