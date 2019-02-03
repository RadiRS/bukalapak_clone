import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

import ProductList from './src/ProductList';
import ProductDetail from './src/ProductDetail';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="productList" component={ProductList} hideNavBar initial />
        <Scene key="productDetail" component={ProductDetail} hideNavBar />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
