import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
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
  Badge,
  View,
  Spinner
} from 'native-base';

// Helper
import { idrCurrency } from './helper/helper';

// Components
import AppBar from './components/AppBar';
import ButtonComponent from './components/Button';

// Data Services
import {
  getProducts,
  deleteProduct,
  updateProduct,
  updateTotalPrice
} from './services/fakeCartServices';
import axios from 'axios';

export default class CartList extends Component {
  state = {
    products: [],
    totalPrice: 0,
    spinner: true
  };

  static navigationOptions = () => {
    return {
      title: 'Keranjang Belanja',
      headerStyle: {
        backgroundColor: '#E40044'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    };
  };

  async componentDidMount() {
    // const products = [...getProducts()];
    // this.setState({ products });
    // this.updateTotalPrice(products);

    const products = await axios.get(
      'http://192.168.1.121:3333/api/v1/orders/'
    );

    this.updateTotalPrice(products.data);
    this.setState({ products: products.data, spinner: false });
  }

  handlePressRemoveItemCart = id => {
    const products = this.state.products.filter(m => m.id !== id);
    this.setState({ products });
    this.updateTotalPrice(products);

    deleteProduct(id);
  };

  handlePressPay = () => {
    Actions.payment();
  };

  handleIncrementQuantity = product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);

    products[index].count++;
    products[index].subPrice = products[index].price * products[index].count;

    this.setState({ products });
    this.updateTotalPrice(products);

    updateProduct(product);
  };

  handleDecrementQuantity = product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);

    products[index].count--;
    if (products[index].count <= 1) products[index].count = 1;
    products[index].subPrice = products[index].price * products[index].count;

    this.setState({ products });
    this.updateTotalPrice(products);

    updateProduct(product);
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
                        <Text style={{ fontSize: 20 }}>
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
                      <Text style={{ fontSize: 25 }}>
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
                  <Text style={{ fontSize: 20 }}>
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
