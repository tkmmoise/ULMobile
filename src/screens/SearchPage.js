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

// colors import
import colors from '../../assets/colors/colors';

//components import
import Message from '../components/Message';

//redux impor
import {useDispatch, useSelector} from 'react-redux';
import {
  getSearchingMessages,
  messagesSelector,
  fetchMessages,
} from '../redux/slices/allMessages';

const SearchPage = props => {
  //States
  const [searchText, setSearchText] = useState('');
  //const [messagesLength,setMessagesLength] = useState();

  // For redux
  const dispatch = useDispatch();
  const {
    messages,
    isLoading: messagesIsLoading,
    hasErrors: messagesHasErrors,
  } = useSelector(messagesSelector);

  // Fetch all messages after mounting conponent
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // ----------For messages per noeud list render---------
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

  const rendersMessages = () => {
    if (messagesIsLoading)
      return (
        <ActivityIndicator
          color={colors.primary}
          size={'large'}
          style={styles.activityIndicator}
        />
      );
    if (messagesHasErrors)
      return (
        <View>
          <Text>Unable to loading noeuds</Text>
        </View>
      );
    return (
      <FlatList
        data={searchedMessages}
        renderItem={renderMessageItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  // ----------For messages per noeuds list render End---------

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
      : messages.slice().filter(message => {
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
      <View style={styles.messageWrapper}>{rendersMessages()}</View>
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
    justifyContent: 'space-between',
  },
  appBar_text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 20,
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
    marginLeft: 4,
    color: '#000',
  },
  searchIcon: {
    alignSelf: 'center',
    //backgroundColor: "blue",
    marginRight: 2,
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
