import React, { Component } from 'react';
import axios from 'axios';

import {
  Container,
  Content,
  Card,
  CardItem,
  Form,
  Item,
  Label,
  Input,
  Text,
  Picker,
  Icon,
  Thumbnail,
  Spinner
} from 'native-base';

// Helper
import { idrCurrency } from './helper/helper';

// Services
import { getTotalPrice } from './services/fakeCartServices';

export default class Payment extends Component {
  state = {
    products: [],
    totalPrice: 0,
    spinner: true
  };

  static navigationOptions = () => {
    return {
      title: 'Pembayaran',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerTintColor: '#fff'
    };
  };

  async componentDidMount() {
    const products = await axios.get(
      // 'http://192.168.0.9:3333/api/v1/orders/'
      'http://192.168.1.121:3333/api/v1/orders/'
    );

    this.setState({ products: products.data, spinner: false });
  }

  render() {
    const { spinner } = this.state;

    return (
      <Container>
        {spinner ? (
          <Spinner color="#E40044" />
        ) : (
          <Content
            contentContainerStyle={{
              padding: 10,
              backgroundColor: '#F5F5F5'
            }}
          >
            <Text>Data Pembeli</Text>
            <Card style={{ padding: 5, paddingBottom: 20 }}>
              <Form>
                <Item stackedLabel>
                  <Label>Nama Pembeli</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Email Pembeli</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Telepon/Handphone</Label>
                  <Input />
                </Item>
              </Form>
            </Card>
            <Text style={{ marginTop: 20 }}>Alamat Pengiriman</Text>
            <Card style={{ padding: 5, paddingBottom: 20 }}>
              <Form>
                <Item stackedLabel>
                  <Label>Provinsi</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Kota</Label>
                  <Input />
                </Item>
                <Item stackedLabel>
                  <Label>Jalan</Label>
                  <Input />
                </Item>
              </Form>
            </Card>
            <Text style={{ marginTop: 20 }}>Daftar Belanja dan Pengiriman</Text>
            <Card style={{ padding: 5, paddingBottom: 20 }}>
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
                  {this.state.products.map((product, index) => (
                    <Card key={index} noShadow>
                      <CardItem>
                        <Thumbnail
                          style={{ flex: 0.5 }}
                          square
                          source={{ uri: product.products.image }}
                        />
                        <Content
                          contentContainerStyle={{ flex: 1, marginLeft: 10 }}
                        >
                          <Text style={{ fontSize: 20 }}>
                            {product.products.name}
                          </Text>
                          <Content
                            contentContainerStyle={{
                              flexDirection: 'row'
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20
                              }}
                            >
                              {product.qty}
                            </Text>
                          </Content>
                          <Text style={{ fontSize: 20 }}>
                            {idrCurrency(product.products.price)}
                          </Text>
                        </Content>
                        <Text
                          style={{
                            flex: 0.5,
                            fontSize: 20,
                            alignSelf: 'flex-end'
                          }}
                        >
                          {idrCurrency(product.price)}
                        </Text>
                      </CardItem>
                    </Card>
                  ))}

                  <Content>
                    <Form>
                      <Label>Jasa Pengiriman</Label>
                      <Item picker>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          placeholder="Select your SIM"
                          placeholderStyle={{ color: '#bfc6ea' }}
                          placeholderIconColor="#007aff"
                        >
                          <Picker.Item label="Wallet" value="key0" />
                          <Picker.Item label="ATM Card" value="key1" />
                          <Picker.Item label="Debit Card" value="key2" />
                          <Picker.Item label="Credit Card" value="key3" />
                          <Picker.Item label="Net Banking" value="key4" />
                        </Picker>
                      </Item>
                    </Form>
                  </Content>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20
                    }}
                  >
                    <Text>Harga Barang</Text>
                    <Text>{idrCurrency(getTotalPrice())}</Text>
                  </Content>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20
                    }}
                  >
                    <Text>Biaya Kirim (J&T REG)</Text>
                    <Text>-</Text>
                  </Content>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20
                    }}
                  >
                    <Text>Sub Total</Text>
                    <Text>{idrCurrency(getTotalPrice())}</Text>
                  </Content>
                </Content>
              </CardItem>
            </Card>
          </Content>
        )}
      </Container>
    );
  }
}
