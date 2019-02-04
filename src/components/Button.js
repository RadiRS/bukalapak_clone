import React from 'react';
import { Button, Icon, Text } from 'native-base';

const ButtonComponent = props => {
  const {
    block = false,
    onPress,
    onShow = true,
    iconName,
    buttonName,
    transparent
  } = props;

  return onShow ? (
    <Button
      rounded
      style={{ backgroundColor: '#E40044' }}
      block={block}
      onPress={onPress}
      transparent={transparent}
    >
      {iconName ? <Icon name={iconName} /> : <Text>{buttonName}</Text>}
    </Button>
  ) : null;
};

export default ButtonComponent;
