import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { Container, Content } from 'native-base';

// Components
import AppBar from './components/AppBar';
import CartItem from './components/CartItem';

// Data Services
import { getProducts } from './services/fakeProductServices';

export default class ProductList extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    const products = [...getProducts()];
    this.setState({ products });
  }

  handlePressProduct = productId => {
    Actions.productDetail({ productId });
  };

  render() {
    const { products } = this.state;

    return (
      <Container>
        <AppBar title="Flash Deal" />
        <Content
          contentContainerStyle={{
            paddingTop: 10,
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {products.map((item, index) => (
            <CartItem
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
