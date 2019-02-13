import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  Footer,
  Row,
  Col,
  Spinner,
  View,
  Badge
} from 'native-base';

// Components
import AppBar from './components/AppBar';
import ButtonComponent from './components/Button';

// Helper
import { idrCurrency } from './helper/helper';

// Data Services
import { getProduct } from './services/fakeProductServices';
import { saveProduct, getProducts as Cart } from './services/fakeCartServices';

export default class ProductDetail extends Component {
  state = {
    data: [],
    spinner: true,
    cart: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <ButtonComponent
            onShow={true}
            onPress={() => alert('Search')}
            transparent={true}
            iconName="search"
          />
          <ButtonComponent
            onShow={true}
            onPress={() => alert('log-in')}
            transparent={true}
            iconName="log-out"
          />
          <ButtonComponent
            onShow={true}
            onPress={() => navigation.navigate('CartList')}
            transparent={true}
            iconName="cart"
            mg={5}
          />
          <Badge
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              backgroundColor: '#FDD938',
              position: 'absolute',
              left: 130
            }}
            warning
          >
            <Text style={{ color: '#E40044' }}>
              {navigation.getParam('cartt')}
            </Text>
          </Badge>
        </View>
      )
    };
  };

  async componentDidMount() {
    const { productId, cart } = this.props.navigation.state.params;

    const product = await axios.get(
      // `http://192.168.0.9:3333/api/v1/products/${productId}`
      `http://192.168.1.121:3333/api/v1/product/${productId}`
    );
    const { data } = product.data;

    const cartProduct = [...this.state.cart, ...cart];

    this.setState({ data, cart: cartProduct, spinner: false });
    this.props.navigation.setParams({ cartt: this.state.cart.length });
  }

  handlePressAdd = product => {
    // await axios
    //   // .post('http://192.168.0.9:3333/api/v1/orders/', data)
    //   .post('http://192.168.1.121:3333/api/v1/orders/', data)
    //   .then(res => alert(JSON.stringify(res.data.status)));

    // // const orders = await axios.get('http://192.168.0.9:3333/api/v1/orders/');
    // const orders = await axios.get('http://192.168.1.121:3333/api/v1/orders/');

    // const cart = orders.data.length;

    let productInCart = this.state.cart.find(m => m.id === product.id);

    if (productInCart) {
      alert('Sudah ada data');
      return;
    }

    const { handlePressBuyItem } = this.props.navigation.state.params;
    const cart = [...this.state.cart, product];

    this.props.navigation.setParams({ cartt: cart.length });
    this.setState({ cart });

    handlePressBuyItem(product);
  };

  handlePressBuy = () => {
    const product = this.state.data;

    saveProduct(product);

    const cart = Cart().length;
    this.setState({ cart });

    Actions.cartList();
  };

  render() {
    const { name, image, price, description } = this.state.data;

    return (
      <Container>
        {this.state.spinner ? (
          <Spinner color="#E40044" />
        ) : (
          <>
            <Content
              padder
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between'
              }}
            >
              <Thumbnail
                square
                source={{ uri: image }}
                style={{ height: 300, width: null, flex: 0.8 }}
              />
              <Text style={{ fontSize: 30 }}>{name}</Text>
              <Text style={{ fontSize: 25, color: '#E40044' }}>
                {idrCurrency(price)}
              </Text>
              <Card
                noShadow
                style={{
                  padding: 10,
                  marginBottom: 10,
                  backgroundColor: '#F5F5F5'
                }}
              >
                <Text style={{ fontSize: 25, color: '#4E4E4E' }}>
                  Deskripsi
                </Text>
                <Text style={{ marginTop: 5, color: '#9A9A9A' }}>
                  {description}
                </Text>
              </Card>
            </Content>
            <Footer
              style={{
                backgroundColor: '#FFFF',
                height: '10%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1
              }}
            >
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: 5
                }}
              >
                <Col style={{ marginRight: 3 }}>
                  <ButtonComponent
                    onPress={() => this.handlePressAdd(this.state.data)}
                    buttonColor="#f5f5f5"
                    textColor="#E40044"
                    block={true}
                    buttonName="Tambah"
                  />
                </Col>
                <Col style={{ marginLeft: 3 }}>
                  <ButtonComponent
                    onPress={this.handlePressBuy}
                    buttonColor="#62DE55"
                    block={true}
                    buttonName="Beli Sekarang"
                  />
                </Col>
              </Row>
            </Footer>
          </>
        )}
      </Container>
    );
  }
}
