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
  Spinner,
  View
} from 'native-base';

// Helper
import { idrCurrency } from '../helper/helper';

// Services
import { getTotalPrice } from '../services/fakeCartServices';

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
            <Card noShadow style={{ padding: 5, paddingBottom: 20 }}>
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
            <Card noShadow style={{ padding: 5, paddingBottom: 20 }}>
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
            <Card noShadow style={{ paddingBottom: 20 }}>
              <CardItem
                style={{ flex: 1, alignItems: 'flex-start', padding: 0 }}
              >
                <Content contentContainerStyle={{ padding: 0 }}>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      padding: 0
                    }}
                  >
                    <Text>Barang</Text>
                    <Text>Sub Total</Text>
                  </Content>
                  {this.state.products.map((product, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10
                      }}
                    >
                      <Thumbnail
                        large
                        style={{
                          backgroundColor: 'green',
                          flex: 0.3,
                          borderRadius: 10
                        }}
                        square
                        source={{ uri: product.products.image }}
                      />
                      <View
                        style={{
                          flex: 1,
                          paddingHorizontal: 10,
                          flexDirection: 'column'
                        }}
                      >
                        <Text style={{ fontSize: 17 }}>
                          {product.products.name}
                        </Text>
                        <Text style={{ fontSize: 17 }}>Qty: {product.qty}</Text>
                        <Text style={{ fontSize: 17 }}>
                          {idrCurrency(product.products.price)}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 17,
                          alignSelf: 'flex-end'
                        }}
                      >
                        {idrCurrency(product.products.price)}
                      </Text>
                    </View>
                  ))}

                  <View style={{ marginTop: 20 }}>
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
                  </View>
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
