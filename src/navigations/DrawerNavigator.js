import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import {DrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Detail" component={Detail} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
