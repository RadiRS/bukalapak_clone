import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Thumbnail, H3 } from 'native-base';

// Helper
import { idrCurrency } from '../helper/helper';

// Components
import ButtonComponent from './Button';

const CartItem = props => {
  const { id, image, name, price, shop } = props.products;

  return (
    <TouchableOpacity
      onPress={() => props.onPress(id)}
      style={{
        flexBasis: '50%',
        alignSelf: 'stretch'
      }}
    >
      <Card noShadow style={{ flex: 1 }}>
        <CardItem cardBody>
          <Thumbnail
            square
            source={{ uri: image }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Text numberOfLines={2}>
            <H3>{name}</H3>
          </Text>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Text>
            <H3 style={{ fontSize: 16, color: '#B8BCB9' }}>{shop}</H3>
          </Text>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Text>
            <H3 style={{ color: '#E40044' }}>{idrCurrency(price)}</H3>
          </Text>
        </CardItem>
        <CardItem
          footer
          style={{
            alignItems: 'flex-end'
          }}
        >
          <ButtonComponent
            onPress={() => props.onPressBuy(props.products)}
            block={true}
            buttonName="Beli"
            buttonColor="#62DE55"
          />
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default CartItem;
