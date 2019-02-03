import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default function CartItem() {
  return (
    <TouchableOpacity onPress={() => Actions.detailItem()}>
      <Card>
        <CardItem cardBody>
          <Image
            source={{ uri: 'https://via.placeholder.com/600/92c952' }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Text>Lampu Selfie Ring Light</Text>
        </CardItem>
        <CardItem>
          <Text>Rp 50.000</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}
