import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { ScrollView } from 'react-native';
import { Container } from 'native-base';

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
        <AppBar showBackNav={false} title="List Item" />
        <Container
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}
        >
          <ScrollView>
            {products.map((item, index) => (
              <CartItem
                key={index}
                products={item}
                onPress={this.handlePressProduct}
              />
            ))}
          </ScrollView>
        </Container>
      </Container>
    );
  }
}
