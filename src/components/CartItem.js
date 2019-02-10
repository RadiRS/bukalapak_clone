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
      style={{ flexBasis: '50%' }}
    >
      <Card noShadow>
        <CardItem cardBody>
          <Thumbnail
            square
            source={{ uri: image }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Text>
            <H3>{name}</H3>
          </Text>
        </CardItem>
        <CardItem>
          <Text>
            <H3 style={{ fontSize: 16, color: '#B8BCB9' }}>{shop}</H3>
          </Text>
        </CardItem>
        <CardItem>
          <Text>
            <H3 style={{ color: '#E40044' }}>{idrCurrency(price)}</H3>
          </Text>
        </CardItem>
        <ButtonComponent
          onPress={() => props.onPressBuy(props.products)}
          margin={7}
          block={true}
          buttonName="Beli"
          buttonColor="#62DE55"
        />
      </Card>
    </TouchableOpacity>
  );
};

export default CartItem;
