import React, { Component } from 'react';
import axios from 'axios';

import {
  Container,
  Content,
  Spinner,
  Badge,
  Text,
  View,
  Toast
} from 'native-base';
import { StatusBar } from 'react-native';

// Components
import CartItem from '../components/CartItem';
import ButtonComponent from '../components/Button';
import { FlatList } from 'react-native-gesture-handler';

export default class ProductList extends Component {
  state = {
    products: [],
    cart: [],
    spinner: true,
    showToast: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Flash Sale',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerTintColor: '#fff',
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
              {navigation.getParam('cartLength')}
            </Text>
          </Badge>
        </View>
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      cartLength: this.state.cart.length,
      cart: this.state.cart
    });

    const products = await axios.get(
      // 'http://192.168.0.9:3333/api/v1/products/'
      'http://192.168.1.121:3333/api/v1/products/'
    );

    const orders = await axios.get(
      // 'http://192.168.0.9:3333/api/v1/products/'
      'http://192.168.1.121:3333/api/v1/orders/'
    );

    this.setState({
      products: products.data,
      cart: orders.data,
      spinner: false
    });

    this.props.navigation.setParams({ cartLength: this.state.cart.length });
  }

  handlePressBuyItem = async product => {
    const data = {
      product_id: product.id,
      qty: 1,
      price: product.price
    };

    await axios
      // .post('http://192.168.0.9:3333/api/v1/order/', data)
      .post('http://192.168.1.121:3333/api/v1/order/', data)
      .then(res =>
        Toast.show({
          text: res.data.status,
          buttonText: 'Okay',
          duration: 3000,
          type: 'success'
        })
      )
      // .then(res => (alert(JSON.stringify(res.data.status))))
      .catch(res => {
        // alert(JSON.stringify(res.data.status));
      });

    // const orders = await axios.get('http://192.168.0.9:3333/api/v1/orders/');
    const orders = await axios.get('http://192.168.1.121:3333/api/v1/orders/');

    const cart = [...orders.data];

    this.props.navigation.setParams({ cartLength: cart.length });
    this.setState({ cart });
  };

  handlePressProduct = async productId => {
    // const orders = await axios.get('http://192.168.0.9:3333/api/v1/orders/');
    const orders = await axios.get('http://192.168.1.121:3333/api/v1/orders/');
    const cart = [...orders.data];

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
            justifyContent: 'center'
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
            // <FlatList
            //   data={products}
            //   showsVerticalScrollIndicator={false}
            //   renderItem={({ item }) => (
            //     <CartItem
            //       onPressBuy={this.handlePressBuyItem}
            //       // key={index}
            //       products={item}
            //       onPress={this.handlePressProduct}
            //     />
            //   )}
            // />
          )}
        </Content>
      </Container>
    );
  }
}
