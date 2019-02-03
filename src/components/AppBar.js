import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Body, Title, Right, Icon, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';

const AppBar = props => {
  const { showBackNav, title } = props;

  // display() {
  //   if (showBackNav) {
  //     return(
  //       <TouchableOpacity onPress={() => Actions.pop()} style={{display:''}}>
  //         <Icon name="arrow-back" style={{ color: 'white' }} />
  //       </TouchableOpacity>
  //     )
  //   }
  // }

  return (
    <Header>
      <Left />
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Icon name="cart" />
      </Right>
    </Header>
  );
};

export default AppBar;
