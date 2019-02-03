import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

import ListItemForm from './src/ListItemForm';
import DetailItem from './src/DetailItem';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="listItem" component={ListItemForm} hideNavBar initial />
        <Scene key="detailItem" component={DetailItem} hideNavBar />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
