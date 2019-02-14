import { createStackNavigator, createAppContainer } from 'react-navigation';

import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import CartList from './src/screens/CartList';
import Payment from './src/screens/Payment';

const RouterComponent = createStackNavigator({
  ProductList,
  ProductDetail,
  CartList,
  Payment
});

const Router = createAppContainer(RouterComponent);

export default Router;
