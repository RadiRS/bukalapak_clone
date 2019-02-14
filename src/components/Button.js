import React from 'react';
import { Button, Icon, Text } from 'native-base';

const ButtonComponent = props => {
  const {
    block = false,
    onPress,
    onShow = true,
    iconName,
    buttonName,
    transparent = false,
    rounded,
    buttonColor = '#E40044',
    margin = 0,
    textColor = 'white',
    mg
  } = props;

  return onShow ? (
    <Button
      style={{
        flex: 1,
        backgroundColor: buttonColor,
        margin: margin,
        marginRight: mg,
        justifyContent: 'center'
      }}
      block={block}
      onPress={onPress}
      transparent={transparent}
    >
      {iconName ? (
        <Icon style={{ color: textColor }} name={iconName} />
      ) : (
        <Text style={{ color: textColor, fontSize: 20 }} uppercase={false}>
          {buttonName}
        </Text>
      )}
    </Button>
  ) : null;
};

export default ButtonComponent;
