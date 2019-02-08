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
  Col
} from 'native-base';

// Helper
import { idrCurrency } from './helper/helper';

// Components
import AppBar from './components/AppBar';
import Button from './components/Button';

// Data Services
import {
  getProducts,
  deleteProduct,
  updateProduct
} from './services/fakeCartServices';

export default class CartList extends Component {
  state = {
    products: [],
    totalPrice: 0
  };

  componentDidMount() {
    const products = [...getProducts()];
    this.setState({ products });
    this.updateTotalPrice(products);
  }

  handlePressRemoveItemCart = _id => {
    const products = this.state.products.filter(m => m._id !== _id);
    this.setState({ products });
    this.updateTotalPrice(products);

    deleteProduct(_id);
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
      return Number(prev) + Number(cur.subPrice);
    }, 0);

    this.setState({ totalPrice });
  };

  render() {
    const { products, totalPrice } = this.state;

    return (
      <Container>
        <AppBar title="Keranjang Belanja" showCartNav={false} />
        {products.length === 0 ? (
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
                        <Text style={{ fontSize: 20 }}>{product.name}</Text>
                        <Text style={{ fontSize: 20 }}>
                          {idrCurrency(product.price)}
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
                          source={{ uri: product.imgUrl }}
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
                        <Button
                          iconName="add"
                          onPress={() => this.handleIncrementQuantity(product)}
                        />
                        <Input
                          value={product.count.toString()}
                          style={{
                            width: 5,
                            textAlign: 'center'
                          }}
                        />
                        <Button
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
                            this.handlePressRemoveItemCart(product._id)
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
                        {idrCurrency(product.subPrice)}
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
                  <Button
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
