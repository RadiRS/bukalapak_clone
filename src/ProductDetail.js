import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Thumbnail, Card } from 'native-base';

// Components
import AppBar from './components/AppBar';
import Button from './components/Button';

// Data Services
import { getProduct } from './services/fakeProductServices';
import { saveProduct } from './services/fakeCartServices';

export default class ProductDetail extends Component {
  state = {
    data: {
      name: '',
      imgUrl: 'image',
      price: '',
      description: ''
    }
  };

  componentDidMount() {
    const { productId } = this.props;
    const data = getProduct(productId);

    this.setState({ data });
  }

  handlePressBuy = () => {
    const product = this.state.data;

    saveProduct(product);

    Actions.cartList();
  };

  render() {
    const { name, imgUrl, price, description } = this.state.data;

    return (
      <Container>
        <AppBar showBackNav />
        <Content
          padder
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between'
          }}
        >
          <Thumbnail
            square
            source={{ uri: imgUrl }}
            style={{ width: null, flex: 0.8 }}
          />
          <Text style={{ fontSize: 30 }}>{name}</Text>
          <Text style={{ fontSize: 25 }}>Rp. {price}</Text>
          <Card
            noShadow
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#F5F5F5'
            }}
          >
            <Text style={{ fontSize: 25 }}>Deskripsi</Text>
            <Text style={{ marginTop: 5 }}>{description}</Text>
          </Card>
          <Button
            onPress={this.handlePressBuy}
            block={true}
            buttonName="Beli Sekarang"
          />
        </Content>
      </Container>
    );
  }
}
