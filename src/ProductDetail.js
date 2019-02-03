import React, { Component } from 'react';
import { Container, Content, Text, Thumbnail, Button } from 'native-base';

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
        <AppBar />
        <Content>
          <Thumbnail
            square
            source={{ uri: imgUrl }}
            style={{ height: 200, width: null, flex: 1 }}
          />
          <Text>{name}</Text>
          <Text>{price}</Text>
          <Text>{description}</Text>
          <Button block>
            <Text>Beli</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
