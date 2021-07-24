import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Started from '../screens/Started';
import Detail from '../screens/Detail';
import SearchPage from '../screens/SearchPage';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

const AppStackNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  const checkIsFirstLaunch = async () => {
    const value = await AsyncStorage.getItem('alreadyLaunched');
    console.log('value', value);
    if (value == null) {
      AsyncStorage.setItem('alreadyLaunched', 'true');
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
  };

  useEffect(() => {
    checkIsFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'Started';
  } else {
    routeName = 'Home';
  }

  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName={routeName}>
      <Stack.Screen name="Started" component={Started} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
