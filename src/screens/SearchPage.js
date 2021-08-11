import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@apollo/client';
// colors import
import colors from '../../assets/colors/colors';

//components import
import Message from '../components/Message';

//graphql import
import {GET_ALL_MESSAGES} from '../graphql/queries';

const SearchPage = props => {
  //States
  const [searchText, setSearchText] = useState('');

  //
  const {loading, error, data} = useQuery(GET_ALL_MESSAGES);
  function AllMessages() {
    if (loading) {
      return (
        <ActivityIndicator
          color={colors.primary}
          size={'large'}
          style={styles.activityIndicator}
        />
      );
    }
    if (error) {
      return (
        <View>
          <Text>{`Error! ${error.message}`}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={searchedMessages}
        renderItem={renderMessageItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    );
  }
  //

  const renderMessageItem = ({item}) => {
    return (
      <Message
        item={item}
        onPress={() => {
          props.navigation.navigate('Detail', {id: item._id});
        }}
      />
    );
  };

  // Handle serache input
  const handleSearchInput = text => {
    if (!text) {
      setSearchText('');
    } else {
      setSearchText(text);
      console.log('text', searchText);
      //dispatch(getSearchingMessages({text: text}));
    }
  };

  const searchedMessages =
    searchText === ''
      ? []
      : data.messageMany.slice().filter(message => {
          const newText = searchText.toLowerCase();
          return `${message.messageObject}`.toLowerCase().includes(newText);
        });
  const messagesLength = searchedMessages.length;

  return (
    <View style={styles.homeBackground}>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <Ionicons
            name="arrow-back"
            size={37}
            color="#000"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <Text style={styles.appBar_text}>Search Page</Text>
        </View>

        {/* Search TextField */}
        <View style={styles.searchInputContainer}>
          <View style={styles.searchInput}>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#000'}
              placeholder="Ecrivez quelque chose"
              keyboardType="default"
              onChangeText={text => {
                handleSearchInput(text);
              }}
            />
            <Ionicons
              name="search"
              size={30}
              color="#000"
              onPress={() => {
                handleSearchInput();
              }}
              style={styles.searchIcon}
            />
          </View>
        </View>

        <View style={styles.numberResultsContainer}>
          <Text>
            {messagesLength}
            {' résultats'}
          </Text>
        </View>
      </SafeAreaView>
      {/* Messages */}
      <View style={styles.messageWrapper}>{AllMessages()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 35,
  },
  appBar: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    //justifyContent: 'space-between',
  },
  appBar_text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 20,
    marginLeft: 80
  },
  searchInputContainer: {
    marginTop: 20,
  },
  searchInput: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    //paddingHorizontal: 15,
    backgroundColor: '#C4C4C445',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  input: {
    flex: 1,
    height: 44,
    //backgroundColor: "red",
    marginLeft: 20,
    color: '#000',
  },
  searchIcon: {
    alignSelf: 'center',
    //backgroundColor: "blue",
    marginRight: 20,
  },
  numberResultsContainer: {
    marginVertical: 10,
    marginLeft: 4,
  },
  messageWrapper: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 35,
  },
});

export default SearchPage;
