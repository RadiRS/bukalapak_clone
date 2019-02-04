import React, { Component } from 'react';
import { Container, Content, Text, Thumbnail, Button, Card } from 'native-base';

// Components
import AppBar from './components/AppBar';

// Data Services
import { getProduct } from './services/fakeProductServices';

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

  render() {
    const { name, imgUrl, price, description } = this.state.data;

    return (
      <Container>
        <AppBar showBackNav />
        <Content contentContainerStyle={{ display: 'flex', flex: 1 }}>
          <Thumbnail
            square
            source={{ uri: imgUrl }}
            style={{ height: 200, width: null, flex: 0.8 }}
          />
          <Text style={{ margin: 10, fontSize: 40 }}>{name}</Text>
          <Text style={{ margin: 10, fontSize: 30 }}>Rp. {price}</Text>
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
          <Button block>
            <Text>Beli</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
