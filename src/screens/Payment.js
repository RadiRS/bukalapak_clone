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
  View,
  Button
} from 'native-base';

// Utils
import { REST_API } from '../utils/constants';
// Helper
import { idrCurrency } from '../helper/helper';
// Services
import { getTotalPrice } from '../services/fakeCartServices';

export default class Payment extends Component {
  state = {
    products: [],
    totalPrice: 0,
    spinner: true,
    custumers: {
      name: '',
      email: '',
      tlp: '',
      address: '',
      city: '',
      street: ''
    },
    couriers: [
      { name: 'J&T REG', price: 1000 },
      { name: 'JNE REG', price: 1300 },
      { name: 'JNE YES', price: 3000 },
      { name: 'SiCepat REG', price: 2000 },
      { name: 'SiCepat YES', price: 4000 }
    ],
    courier: { name: 'J&T REG', price: 1000 }
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

  handleCourierChange = courier => {
    let courierInState = this.state.couriers.find(c => c.name === courier);
    let totalPrice = getTotalPrice() + courierInState.price;

    this.setState(
      Object.assign(this.state.courier, {
        name: courierInState.name,
        price: courierInState.price
      })
    );
    this.setState({ totalPrice });
  };

  async componentDidMount() {
    const products = await axios.get(`${REST_API}/orders/`);
    let totalPrice = getTotalPrice() + this.state.courier.price;

    this.setState({ products: products.data, spinner: false, totalPrice });
  }

  render() {
    const { spinner, couriers, courier, totalPrice } = this.state;

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
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray'
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
                        <Text style={{ fontSize: 17 }}>
                          Qty : {product.qty}
                        </Text>
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
                          inlineLabel
                          mode="dialog"
                          iosIcon={<Icon name="arrow-down" />}
                          selectedValue={courier.name}
                          onValueChange={this.handleCourierChange.bind(this)}
                        >
                          {couriers.map((courier, index) => (
                            <Picker.Item
                              key={index}
                              label={`${courier.name}\t-\t${idrCurrency(
                                courier.price
                              )}`}
                              value={courier.name}
                            />
                          ))}
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
                    <Text>{idrCurrency(courier.price)}</Text>
                  </Content>
                  <Content
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20
                    }}
                  >
                    <Text>Sub Total</Text>
                    <Text>{idrCurrency(totalPrice)}</Text>
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
