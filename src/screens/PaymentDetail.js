import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Content,
  View,
  Text,
  Card,
  Thumbnail,
  Spinner
} from 'native-base';

// Utils
import { REST_API } from '../utils/constants';
// Helper
import { idrCurrency } from '../helper/helper';
// Services
import { getTotalPrice } from '../services/fakeCartServices';
// Image
const bri_logo = require('../../assets/img/bri_logo.png');
// Components
import ButtonComponent from '../components/Button';

export default class PaymentDetail extends Component {
  state = {
    products: [],
    totalPrice: 0,
    spinner: true,
    customer: {},
    courier: {}
  };

  static navigationOptions = () => {
    return {
      headerLeft: null,
      headerTransparent: true
    };
  };

  async componentDidMount() {
    const {
      totalPrice,
      customer,
      courier
    } = this.props.navigation.state.params;
    const products = await axios.get(`${REST_API}/orders/`);

    this.setState({
      products: products.data,
      spinner: false,
      totalPrice,
      customer,
      courier
    });
  }

  render() {
    const { products, totalPrice, spinner, customer } = this.state;

    return (
      <Container>
        <Content contentContainerStyle={{ backgroundColor: '#F5F5F5' }}>
          {spinner ? (
            <Spinner color="#E40044" />
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 20 }}>ID Pemesanan</Text>
                <Text style={{ fontSize: 20 }}>93DKJFI</Text>
              </View>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 20 }}>Total Belanja :</Text>
                <Text style={{ fontSize: 20, color: '#E40044' }}>
                  {idrCurrency(totalPrice)}
                </Text>
              </Card>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    alignSelf: 'flex-start',
                    marginBottom: 10
                  }}
                >
                  Instruksi Pembayaran :
                </Text>
                <Thumbnail
                  style={{ flex: 1, minHeight: 100, width: 120 }}
                  large
                  square
                  source={bri_logo}
                />
                <Text style={{ fontSize: 20 }}>2877499293</Text>
                <Text style={{ fontSize: 20 }}>PT PAYMENT SEJAHTERA</Text>
              </Card>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white'
                }}
              >
                <Text style={{ fontSize: 17, marginBottom: 10 }}>
                  Alamat Pengiriman :
                </Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  {customer.name}
                </Text>
                <Text style={{ fontSize: 17 }}>
                  {customer.street} {customer.city} {customer.prov}
                </Text>
                <Text>{customer.email}</Text>
                <Text>{customer.tlp}</Text>
              </Card>
              <Card
                noShadow
                style={{
                  padding: 10,
                  borderColor: 'white'
                }}
              >
                <Text style={{ fontSize: 17, marginBottom: 10 }}>
                  Daftar Belanja :
                </Text>
                {products.map((product, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row-reverse',
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
                        flexDirection: 'column',
                        marginBottom: 10
                      }}
                    >
                      <Text style={{ fontSize: 17 }}>
                        {product.products.name}
                      </Text>
                      <Text style={{ fontSize: 17 }}>Qty : {product.qty}</Text>
                    </View>
                  </View>
                ))}
              </Card>
              <ButtonComponent block={true} buttonName="Selesai" />
            </>
          )}
        </Content>
      </Container>
    );
  }
}
