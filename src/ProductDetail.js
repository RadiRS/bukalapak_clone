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
  Col
} from 'native-base';

// Components
import AppBar from './components/AppBar';
import Button from './components/Button';

// Helper
import { idrCurrency } from './helper/helper';

// Data Services
import { getProduct } from './services/fakeProductServices';
import { saveProduct, getProducts as Cart } from './services/fakeCartServices';

export default class ProductDetail extends Component {
  state = {
    data: {
      name: '',
      image: 'image',
      price: '',
      description: ''
    },
    cart: 0
  };

  async componentDidMount() {
    const { productId, cart } = this.props;
    const product = await axios.get(
      // `http://192.168.1.121:3333/api/v1/products/${productId}`
      `http://192.168.0.9:3333/api/v1/products/${productId}`
    );
    const { data } = product.data;

    this.setState({ data, cart });
  }

  handlePressAdd = product => {
    // await axios.post(`http://192.168.1.121:3333/api/v1/products/${product}`);
    // saveProduct(product);
    // const cart = Cart().length;
    // this.setState({ cart });
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
        <AppBar showBackNav cart={this.state.cart} />
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
            style={{ width: null, flex: 0.8 }}
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
            <Text style={{ fontSize: 25, color: '#4E4E4E' }}>Deskripsi</Text>
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
              <Button
                onPress={() => this.handlePressAdd(this.state.data)}
                buttonColor="#f5f5f5"
                textColor="#E40044"
                block={true}
                buttonName="Tambah"
              />
            </Col>
            <Col style={{ marginLeft: 3 }}>
              <Button
                onPress={this.handlePressBuy}
                buttonColor="#62DE55"
                block={true}
                buttonName="Beli Sekarang"
              />
            </Col>
          </Row>
        </Footer>
      </Container>
    );
  }
}
