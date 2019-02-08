import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { Container, Content } from 'native-base';

// Components
import AppBar from './components/AppBar';
import CartItem from './components/CartItem';

// Data Services
import { getProducts } from './services/fakeProductServices';
import { getProducts as Cart, saveProduct } from './services/fakeCartServices';

export default class ProductList extends Component {
  state = {
    products: [],
    cart: Cart().length
  };

  componentDidMount() {
    const products = [...getProducts()];
    const cart = Cart().length;
    this.setState({ products, cart });
  }

  handlePressBuyItem = product => {
    saveProduct(product);
    const cart = Cart().length;
    this.setState({ cart });
  };

  handlePressProduct = productId => {
    const cart = Cart().length;
    Actions.productDetail({ productId, cart });
  };

  render() {
    const { products, cart } = this.state;

    return (
      <Container>
        <AppBar
          showBackNav={false}
          title="Flash Deal"
          cart={this.props.totalCart ? this.props.totalCart : cart}
        />
        <Content
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          {products.map((item, index) => (
            <CartItem
              onPressBuy={this.handlePressBuyItem}
              key={index}
              products={item}
              onPress={this.handlePressProduct}
            />
          ))}
        </Content>
      </Container>
    );
  }
}
