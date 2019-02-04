import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Input
} from 'native-base';

// Components
import AppBar from './components/AppBar';
import Button from './components/Button';

export default class CartList extends Component {
  state = {
    product: []
  };

  handlePressPay = () => {
    Actions.payment();
  };

  render() {
    return (
      <Container>
        <AppBar title="Keranjang Belanja" showCartNav={false} />
        <Card style={{ flex: 1 }}>
          <CardItem style={{ flex: 1, alignItems: 'flex-start' }}>
            <Content>
              <Content
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <Text>Barang</Text>
                <Text>Sub Total</Text>
              </Content>
              <Card noShadow>
                <CardItem>
                  <Thumbnail
                    style={{ flex: 0.5 }}
                    square
                    source={{ uri: 'http://lorempixel.com/640/480' }}
                  />
                  <Content contentContainerStyle={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 20 }}>Wathch :LJDflk</Text>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'row'
                      }}
                    >
                      <Button buttonName="+" />
                      <Input
                        value={'0'}
                        style={{
                          width: 10,
                          textAlign: 'center'
                        }}
                      />
                      <Button buttonName="-" />
                    </Content>
                    <Text style={{ fontSize: 20 }}>Rp 1000</Text>
                  </Content>
                  <Text
                    style={{ flex: 0.5, fontSize: 20, alignSelf: 'flex-end' }}
                  >
                    Rp 4000
                  </Text>
                </CardItem>
              </Card>
              <Content
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 20
                }}
              >
                <Text>Total Harga</Text>
                <Text>Rp 4000</Text>
              </Content>
            </Content>
          </CardItem>
          <CardItem style={{ flexDirection: 'column' }}>
            <Button
              onPress={this.handlePressPay}
              block={true}
              buttonName="Pembayaran"
            />
          </CardItem>
        </Card>
      </Container>
    );
  }
}
