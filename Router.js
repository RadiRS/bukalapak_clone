import { createStackNavigator, createAppContainer } from 'react-navigation';

import ProductList from './src/ProductList';
import ProductDetail from './src/ProductDetail';
import CartList from './src/CartList';
import Payment from './src/Payment';

const RouterComponent = createStackNavigator({
  ProductList,
  ProductDetail,
  CartList,
  Payment
});

const Router = createAppContainer(RouterComponent);

export default Router;
