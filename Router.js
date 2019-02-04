import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

import ProductList from './src/ProductList';
import ProductDetail from './src/ProductDetail';
import CartList from './src/CartList';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="productList" component={ProductList} hideNavBar initial />
        <Scene key="productDetail" component={ProductDetail} hideNavBar />
        <Scene key="cartList" component={CartList} hideNavBar />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
