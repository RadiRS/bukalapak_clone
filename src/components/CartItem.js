import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Thumbnail, H3 } from 'native-base';

const CartItem = props => {
  const { _id, imgUrl, name, price } = props.products;

  return (
    <TouchableOpacity
      onPress={() => props.onPress(_id)}
      style={{ flexBasis: '50%' }}
    >
      <Card style={{}}>
        <CardItem cardBody>
          <Thumbnail
            square
            source={{ uri: imgUrl }}
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
            <H3 style={{ color: '#E40044' }}> Rp {price}</H3>
          </Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default CartItem;
