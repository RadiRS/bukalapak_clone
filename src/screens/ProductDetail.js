import React, { Component } from 'react';
import axios from 'axios';
import { HeaderBackButton } from 'react-navigation';
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  Footer,
  Row,
  Col,
  Spinner,
  CardItem
} from 'native-base';

// Utils
import { REST_API } from '../utils/constants';
// Helper
import { idrCurrency } from '../helper/helper';
// Components
import ButtonComponent from '../components/Button';

export default class ProductDetail extends Component {
  state = {
    data: [],
    spinner: true,
    cart: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerLeft: (
        <HeaderBackButton
          tintColor="#E40044"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  async componentDidMount() {
    const { productId, cart } = this.props.navigation.state.params;

    const product = await axios.get(`${REST_API}/product/${productId}`);
    const { data } = product.data;

    const cartProduct = [...this.state.cart, ...cart];

    this.setState({ data, cart: cartProduct, spinner: false });
    this.props.navigation.setParams({ cartLength: this.state.cart.length });
  }

  handlePressAdd = product => {
    const { handlePressBuyItem } = this.props.navigation.state.params;
    const cart = [...this.state.cart, product];

    this.props.navigation.setParams({ cartLength: cart.length });
    this.setState({ cart });

    handlePressBuyItem(product);
  };

  handlePressBuy = product => {
    const { handlePressBuyItem } = this.props.navigation.state.params;

    handlePressBuyItem(product);

    this.props.navigation.navigate('CartList');
  };

  render() {
    const { name, image, price, description } = this.state.data;

    return (
      <Container>
        {this.state.spinner ? (
          <Spinner color="#E40044" />
        ) : (
          <>
            <Content
              contentContainerStyle={{
                backgroundColor: '#EFF0F4'
              }}
            >
              <Card
                noShadow
                style={{
                  margin: 0,
                  padding: 0,
                  marginBottom: 10,
                  borderColor: 'white'
                }}
              >
                <Thumbnail
                  square
                  source={{ uri: image }}
                  style={{
                    height: 400,
                    width: null,
                    flex: 1
                  }}
                />
                <CardItem>
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                    {name}
                  </Text>
                </CardItem>
                <CardItem>
                  <Text
                    style={{
                      fontSize: 23,
                      color: '#E40044',
                      fontWeight: 'bold'
                    }}
                  >
                    {idrCurrency(price)}
                  </Text>
                </CardItem>
              </Card>

              <Card
                noShadow
                style={{
                  padding: 10,
                  marginBottom: 10,
                  borderColor: 'white'
                }}
              >
                <Text
                  style={{ fontSize: 25, color: '#4E4E4E', fontWeight: 'bold' }}
                >
                  Informasi Barang
                </Text>
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
                  <ButtonComponent
                    onPress={() => this.handlePressAdd(this.state.data)}
                    buttonColor="#f5f5f5"
                    textColor="#E40044"
                    block={true}
                    buttonName="Tambah"
                  />
                </Col>
                <Col style={{ marginLeft: 3 }}>
                  <ButtonComponent
                    onPress={() => this.handlePressBuy(this.state.data)}
                    buttonColor="#62DE55"
                    block={true}
                    buttonName="Beli Sekarang"
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
