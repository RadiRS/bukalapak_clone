import { createStackNavigator, createAppContainer } from 'react-navigation';

import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import CartList from './src/screens/CartList';
import Payment from './src/screens/Payment';
import Search from './src/screens/Search';

const RouterComponent = createStackNavigator(
  {
    ProductList,
    ProductDetail,
    CartList,
    Payment,
    Search
  },
  {
    initialRouteName: 'ProductList'
  }
);

const Router = createAppContainer(RouterComponent);

export default Router;
