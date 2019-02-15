import React, { Component } from 'react';
import axios from 'axios';
import { StatusBar, FlatList } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Badge,
  Text,
  View,
  Toast
} from 'native-base';

// Utils
import { REST_API } from '../utils/constants';
// Components
import CartItem from '../components/CartItem';
import ButtonComponent from '../components/Button';

export default class ProductList extends Component {
  state = {
    products: [],
    cart: [],
    spinner: true
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
            onPress={() => navigation.navigate('Search')}
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
    const products = await axios.get(`${REST_API}/products/`);
    const orders = await axios.get(`${REST_API}/orders/`);

    this.setState({
      products: products.data,
      cart: orders.data,
      spinner: false
    });
    this.props.navigation.setParams({
      cart: this.state.cart,
      cartLength: this.state.cart.length
    });
  }

  handlePressBuyItem = async product => {
    const data = {
      product_id: product.id,
      qty: 1,
      price: product.price
    };

    const result = await axios.post(`${REST_API}/order/`, data);

    Toast.show({
      text: result.data.status,
      buttonText: 'Okay',
      duration: 2000,
      type: 'success'
    });

    const orders = await axios.get(`${REST_API}/orders/`);

    const cart = [...orders.data];

    this.props.navigation.setParams({ cartLength: cart.length });
    this.setState({ cart });
  };

  handlePressProduct = async productId => {
    const orders = await axios.get(`${REST_API}/orders/`);
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
