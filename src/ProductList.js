import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import { Container, Content, Spinner, Badge, Text, View } from 'native-base';
import { StatusBar } from 'react-native';

// Components
import AppBar from './components/AppBar';
import CartItem from './components/CartItem';
import ButtonComponent from './components/Button';

// Data Services
// import { getProducts } from './services/fakeProductServices';
// import { getProducts as Cart, saveProduct } from './services/fakeCartServices';

export default class ProductList extends Component {
  state = {
    products: [],
    cart: [],
    spinner: true
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: (
        <View style={{ alignItems: 'center' }}>
          <ButtonComponent transparent={true} iconName="menu" />
        </View>
      ),
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
            onPress={() => Actions.cartList()}
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
              {navigation.getParam('cart')}
            </Text>
          </Badge>
        </View>
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({ cart: this.state.cart.length });

    const products = await axios.get(
      // 'http://192.168.0.9:3333/api/v1/products/'
      'http://192.168.1.121:3333/api/v1/products/'
    );
    // const cart = await axios.get('http://192.168.0.9:3333/api/v1/orders/');
    const cart = [...this.state.cart];

    this.setState({
      products: products.data,
      cart,
      spinner: false
    });
  }

  handlePressBuyItem = async product => {
    // const data = {
    //   product_id: product.id,
    //   qty: 1,
    //   price: product.price
    // };

    // await axios
    //   .post('http://192.168.0.9:3333/api/v1/orders/', data)
    //   .then(res => alert(JSON.stringify(res.data.status)));

    // const orders = await axios.get('http://192.168.0.9:3333/api/v1/orders/');

    let productInCart = this.state.cart.find(m => m.id === product.id);

    if (productInCart) {
      alert('Sudah ada data');
      return;
    }

    alert('Data berhasil ditambahkan');

    const cart = [...this.state.cart, product];

    this.props.navigation.setParams({ cart: cart.length });
    this.setState({ cart });
  };

  handlePressProduct = productId => {
    const cart = this.state.cart;

    this.props.navigation.navigate('ProductDetail', {
      cart,
      productId,
      handlePressBuyItem: this.handlePressBuyItem
    });
  };

  render() {
    const { products, spinner } = this.state;

    return (
      <Container>
        <StatusBar backgroundColor="#E40044" />
        <Content
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          {spinner ? (
            <Spinner color="#E40044" />
          ) : (
            products.map((item, index) => (
              <CartItem
                onPressBuy={this.handlePressBuyItem}
                key={index}
                products={item}
                onPress={this.handlePressProduct}
              />
            ))
          )}
        </Content>
      </Container>
    );
  }
}
