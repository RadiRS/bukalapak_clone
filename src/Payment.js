import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Form,
  Item,
  Label,
  Input,
  Text,
  Picker,
  Icon,
  Thumbnail
} from 'native-base';

// Helper
import { idrCurrency } from './helper/helper';

// Components
import AppBar from './components/AppBar';
import Button from './components/Button';

export default class Payment extends Component {
  render() {
    return (
      <Container>
        <AppBar showCartNav={false} />
        <Content
          contentContainerStyle={{
            padding: 10,
            backgroundColor: '#F5F5F5'
          }}
        >
          <Text>Data Pembeli</Text>
          <Card style={{ padding: 5, paddingBottom: 20 }}>
            <Form>
              <Item stackedLabel>
                <Label>Nama Pembeli</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Email Pembeli</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Telepon/Handphone</Label>
                <Input />
              </Item>
            </Form>
          </Card>
          <Text style={{ marginTop: 20 }}>Alamat Pengiriman</Text>
          <Card style={{ padding: 5, paddingBottom: 20 }}>
            <Form>
              <Item stackedLabel>
                <Label>Provinsi</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Kota</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Jalan</Label>
                <Input />
              </Item>
            </Form>
          </Card>
          <Text style={{ marginTop: 20 }}>Daftar Belanja dan Pengiriman</Text>
          <Card style={{ padding: 5, paddingBottom: 20 }}>
            <CardItem style={{ flex: 1, alignItems: 'flex-start' }}>
              <Content>
                <Content
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Text>Barang</Text>
                  <Text>Sub Total</Text>
                </Content>
                <Card noShadow>
                  <CardItem>
                    <Thumbnail
                      style={{ flex: 0.5 }}
                      square
                      source={{ uri: 'http://lorempixel.com/640/480' }}
                    />
                    <Content
                      contentContainerStyle={{ flex: 1, marginLeft: 10 }}
                    >
                      <Text style={{ fontSize: 20 }}>Wathch :LJDflk</Text>
                      <Content
                        contentContainerStyle={{
                          flexDirection: 'row'
                        }}
                      >
                        <Button buttonName="+" />
                        <Input
                          value={'0'}
                          style={{
                            width: 10,
                            textAlign: 'center'
                          }}
                        />
                        <Button buttonName="-" />
                      </Content>
                      <Text style={{ fontSize: 20 }}>Rp 1000</Text>
                    </Content>
                    <Text
                      style={{ flex: 0.5, fontSize: 20, alignSelf: 'flex-end' }}
                    >
                      Rp 4000
                    </Text>
                  </CardItem>
                </Card>
                <Content>
                  <Form>
                    <Label>Jasa Pengiriman</Label>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: '#bfc6ea' }}
                        placeholderIconColor="#007aff"
                      >
                        <Picker.Item label="Wallet" value="key0" />
                        <Picker.Item label="ATM Card" value="key1" />
                        <Picker.Item label="Debit Card" value="key2" />
                        <Picker.Item label="Credit Card" value="key3" />
                        <Picker.Item label="Net Banking" value="key4" />
                      </Picker>
                    </Item>
                  </Form>
                </Content>
                <Content
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 20
                  }}
                >
                  <Text>Harga Barang</Text>
                  <Text>Rp 4000</Text>
                </Content>
                <Content
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 20
                  }}
                >
                  <Text>Biaya Kirim (J&T REG)</Text>
                  <Text>-</Text>
                </Content>
                <Content
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 20
                  }}
                >
                  <Text>Sub Total</Text>
                  <Text>Rp 4000</Text>
                </Content>
              </Content>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
