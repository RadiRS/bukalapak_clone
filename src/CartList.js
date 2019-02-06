import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Input
} from 'native-base';

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
  }

  handlePressRemoveItemCart = _id => {
    const products = this.state.products.filter(m => m._id !== _id);
    this.setState({ products });

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

    updateProduct(product);
  };

  handleDecrementQuantity = product => {
    const products = [...this.state.products];
    const index = products.indexOf(product);

    products[index].count--;
    if (products[index].count <= 1) products[index].count = 1;
    products[index].subPrice = products[index].price * products[index].count;

    this.setState({ products });

    updateProduct(product);
  };

  render() {
    const { products } = this.state;

    let total = products.reduce(function(prev, cur) {
      return prev + cur.subPrice;
    }, 0);

    // this.setState({ totalPrice: total });

    return (
      <Container>
        <AppBar title="Keranjang Belanja" showCartNav={false} />
        {products.length === 0 ? (
          <Text style={{ marginTop: '20%', alignSelf: 'center' }}>
            Belum ada barang di keranjang belanja kamu
          </Text>
        ) : (
          <Card style={{ flex: 1 }}>
            <CardItem style={{ flex: 1, alignItems: 'flex-start' }}>
              <Content>
                <Content
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Text>Barang</Text>
                  <Text>{products.length}</Text>
                  <Text>Sub Total</Text>
                </Content>
                {products.map((product, index) => (
                  <Card key={index} noShadow>
                    <CardItem>
                      <Thumbnail
                        style={{ flex: 0.5 }}
                        square
                        source={{ uri: product.imgUrl }}
                      />
                      <Content
                        contentContainerStyle={{ flex: 1, marginLeft: 10 }}
                      >
                        <Text style={{ fontSize: 20 }}>{product.name}</Text>
                        <Content
                          contentContainerStyle={{
                            flexDirection: 'row'
                          }}
                        >
                          <Button
                            buttonName="+"
                            onPress={() =>
                              this.handleIncrementQuantity(product)
                            }
                          />
                          <Input
                            value={product.count.toString()}
                            style={{
                              width: 5,
                              textAlign: 'center'
                            }}
                          />
                          <Button
                            buttonName="-"
                            onPress={() =>
                              this.handleDecrementQuantity(product)
                            }
                          />
                        </Content>
                        <Text style={{ fontSize: 20 }}>
                          Rp. {product.price}
                        </Text>
                      </Content>
                      <Text
                        style={{
                          flex: 0.5,
                          fontSize: 20,
                          alignSelf: 'flex-end'
                        }}
                      >
                        Rp. {product.subPrice}
                      </Text>
                      <Button
                        onPress={() =>
                          this.handlePressRemoveItemCart(product._id)
                        }
                        buttonName="X"
                      />
                    </CardItem>
                  </Card>
                ))}
                <Content
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 20
                  }}
                >
                  <Text>Total Harga</Text>
                  <Text>Rp. {total}</Text>
                </Content>
              </Content>
            </CardItem>
            <CardItem style={{ flexDirection: 'column' }}>
              <Button
                onPress={this.handlePressPay}
                block={true}
                buttonName="Pembayaran"
              />
            </CardItem>
          </Card>
        )}
      </Container>
    );
  }
}
