import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Started from '../screens/Started';
import Detail from '../screens/Detail';
import SearchPage from '../screens/SearchPage';
import DrawerNavigator from './DrawerNavigator';

//graphql import
import {GET_NODES} from '../graphql/queries';
import {useQuery} from '@apollo/client';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

const AppStackNavigator = () => {
  const {data} = useQuery(GET_NODES);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  // set all noeuds IDs in async storage
  const setNoeudsIdsInStorage = () => {
    const allnoeudsIds = data?.noeudMany.map(noeud => {
      return noeud._id;
    });
    allnoeudsIds && AsyncStorage.setItem('noeudsIds', allnoeudsIds);
    console.log('allnoeudsIds', allnoeudsIds);
  };

  const checkIsFirstLaunch = async () => {
    const value = await AsyncStorage.getItem('alreadyLaunched');
    const noeudsIds = await AsyncStorage.getItem('noeudsIds');
    console.log('value', value);
    console.log(data);
    console.log('noeudsIds', noeudsIds);
    if (value == null) {
      AsyncStorage.setItem('alreadyLaunched', 'true');
      setIsFirstLaunch(true);
      setNoeudsIdsInStorage();
    } else {
      setIsFirstLaunch(false);
    }
  };

  useEffect(() => {
    checkIsFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
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
