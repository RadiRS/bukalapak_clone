import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Thumbnail } from 'native-base';

const CartItem = props => {
  const { _id, imgUrl, name, price } = props.products;

  return (
    <TouchableOpacity onPress={() => props.onPress(_id)}>
      <Card style={{ width: 230 }}>
        <CardItem cardBody>
          <Thumbnail
            square
            source={{ uri: imgUrl }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Text>{name}</Text>
        </CardItem>
        <CardItem>
          <Text>Rp {price}</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default CartItem;
