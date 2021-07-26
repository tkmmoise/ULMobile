import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
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
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

//server uri
import {uri} from './src/config/apollo.config';

const client = new ApolloClient({
  uri: uri + 'graphql',
  cache: new InMemoryCache(),
});

//create Store
const store = configureStore({reducer: rootReducer});

const App = () => {
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
