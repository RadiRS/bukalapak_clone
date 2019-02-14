import React, { Component } from 'react';
import axios from 'axios';

import { HeaderBackButton } from 'react-navigation';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Input,
  Icon,
  Footer,
  Row,
  Col,
  Spinner
} from 'native-base';

// Helper
import { idrCurrency } from '../helper/helper';

// Components
import ButtonComponent from '../components/Button';

// Data Services
import { updateTotalPrice } from '../services/fakeCartServices';

export default class CartList extends Component {
  state = {
    products: [],
    totalPrice: 0,
    spinner: true
  };

  static navigationOptions = ({ navigation }) => {
    const cartLength = navigation.getParam('cartLength');
    return {
      title: 'Keranjang Belanja',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerLeft: (
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            navigation.navigate('ProductList', { cartLength });
          }}
        />
      ),
      headerTintColor: '#fff'
    };
  };

  async componentDidMount() {
    const products = await axios.get(
      // 'http://192.168.0.9:3333/api/v1/orders/'
      'http://192.168.1.121:3333/api/v1/orders/'
    );

    this.updateTotalPrice(products.data);
    this.setState({ products: products.data, spinner: false });
    this.props.navigation.setParams({ cartLength: this.state.products.length });
  }

  handlePressRemoveItemCart = async id => {
    await axios.delete(`http://192.168.1.121:3333/api/v1/order/${id}`);

    this.setState({ spinner: true });

    const products = await axios.get(
      `http://192.168.1.121:3333/api/v1/orders/`
    );

    this.setState({ products: products.data, spinner: false });
    this.updateTotalPrice(products.data);
    this.props.navigation.setParams({ cartLength: this.state.products.length });
  };

  handlePressPay = () => {
    this.props.navigation.navigate('Payment');
  };

  handleIncrementQuantity = async product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);

    products[index].qty++;
    products[index].price =
      products[index].products.price * products[index].qty;

    this.setState({ products });
    this.updateTotalPrice(products);

    data = {
      qty: this.state.products[index].qty,
      price: this.state.products[index].price
    };

    await axios.patch(
      `http://192.168.1.121:3333/api/v1/order/${product.id}`,
      data
    );
  };

  handleDecrementQuantity = async product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);

    products[index].qty--;
    if (products[index].qty <= 1) products[index].qty = 1;
    products[index].price =
      products[index].products.price * products[index].qty;

    this.setState({ products });
    this.updateTotalPrice(products);

    data = {
      qty: this.state.products[index].qty,
      price: this.state.products[index].price
    };

    await axios.patch(
      `http://192.168.1.121:3333/api/v1/order/${product.id}`,
      data
    );
  };

  updateTotalPrice = products => {
    let totalPrice = products.reduce(function(prev, cur) {
      return Number(prev) + Number(cur.price);
    }, 0);

    this.setState({ totalPrice });
    updateTotalPrice(totalPrice);
  };

  render() {
    const { products, totalPrice, spinner } = this.state;

    return (
      <Container>
        {spinner ? (
          <Spinner color="#E40044" />
        ) : products.length === 0 ? (
          <Content
            contentContainerStyle={{ marginTop: '20%', alignItems: 'center' }}
          >
            <Icon name="cart" />
            <Text>Belum ada barang di keranjang belanja kamu</Text>
          </Content>
        ) : (
          <>
            <Content contentContainerStyle={{ backgroundColor: '#F5F5F5' }}>
              {products.map((product, index) => (
                <Card key={index} noShadow transparent>
                  <CardItem
                    header
                    style={{
                      backgroundColor: '#FAFAFA'
                    }}
                  >
                    <Text>
                      <Icon name="cart" />
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Card
                        transparent
                        style={{
                          flex: 4
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>
                          {product.products.name}
                        </Text>
                        <Text style={{ fontSize: 20, color: '#E40044' }}>
                          {idrCurrency(product.products.price)}
                        </Text>
                      </Card>
                      <Card
                        transparent
                        style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}
                      >
                        <Thumbnail
                          square
                          style={{ width: '100%', height: 70 }}
                          source={{ uri: product.products.image }}
                        />
                      </Card>
                    </Content>
                  </CardItem>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Content
                        contentContainerStyle={{
                          flexDirection: 'row'
                        }}
                      >
                        <ButtonComponent
                          iconName="add"
                          onPress={() => this.handleIncrementQuantity(product)}
                        />
                        <Input
                          keyboardType="number-pad"
                          value={product.qty.toString()}
                          style={{
                            width: 5,
                            textAlign: 'center'
                          }}
                        />
                        <ButtonComponent
                          iconName="remove"
                          onPress={() => this.handleDecrementQuantity(product)}
                        />
                      </Content>
                      <Card
                        transparent
                        style={{
                          flex: 1,
                          alignItems: 'flex-end'
                        }}
                      >
                        <Icon
                          onPress={() =>
                            this.handlePressRemoveItemCart(product.id)
                          }
                          style={{ color: '#E40044' }}
                          name="trash"
                        />
                      </Card>
                    </Content>
                  </CardItem>
                  <CardItem
                    footer
                    style={{
                      backgroundColor: '#FAFAFA',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Content>
                      <Text style={{ color: '#9A9A9A' }}>SUB TOTAL</Text>
                      <Text style={{ fontSize: 25, color: '#E40044' }}>
                        {idrCurrency(product.price)}
                      </Text>
                    </Content>
                  </CardItem>
                </Card>
              ))}
            </Content>
            <Footer style={{ backgroundColor: 'white', height: '10%' }}>
              <Row style={{ alignItems: 'center' }}>
                <Col style={{ padding: 10 }}>
                  <Text style={{ color: '#9A9A9A' }}>TOTAL BELANJA</Text>
                  <Text style={{ fontSize: 20, color: '#E40044' }}>
                    {idrCurrency(totalPrice)}
                  </Text>
                </Col>
                <Col style={{ padding: 10 }}>
                  <ButtonComponent
                    onPress={() => this.handlePressPay()}
                    block={true}
                    buttonName="Bayar"
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
