import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigator from './src/navigations/AppStackNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

//redux modules
import rootReducer from './src/redux/slices';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
//graphql
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {persistCache, AsyncStorageWrapper} from 'apollo3-cache-persist';
import cache from './src/config/cache';

//server uri
import {uri} from './src/config/apollo.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Loading} from './src/components/Loading';

//create Store
const store = configureStore({reducer: rootReducer});

const App = () => {
  const [client, setClient] = useState(null);

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      await axios.post(uri + 'api/fcmToken/create', {
        token,
      });
    } catch (err) {
      //Do nothing
      console.log(err.response.data);
      return;
    }
  };

  useEffect(() => {
    sendFcmToken();
  }, []);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => {
      setClient(
        new ApolloClient({
          uri: uri + 'graphql',
          cache,
        }),
      );
    });
  }, []);

  if (!client) {
    return <Loading />;
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <AppStackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
