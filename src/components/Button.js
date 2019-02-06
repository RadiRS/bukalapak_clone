import React from 'react';
import { Button, Icon, Text } from 'native-base';

const ButtonComponent = props => {
  const {
    block = false,
    onPress,
    onShow = true,
    iconName,
    buttonName,
    transparent,
    rounded,
    buttonColor = '#E40044',
    margin = 0,
    mg
  } = props;

  return onShow ? (
    <Button
      style={{
        backgroundColor: buttonColor,
        margin: margin,
        marginRight: mg
      }}
      block={block}
      onPress={onPress}
      transparent={transparent}
    >
      {iconName ? <Icon name={iconName} /> : <Text>{buttonName}</Text>}
    </Button>
  ) : null;
};

export default ButtonComponent;
