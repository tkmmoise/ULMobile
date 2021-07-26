import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@apollo/client';

//My imports
import colors from '../../assets/colors/colors';

// components import
import Noeud from '../components/Noeud';
import Message from '../components/Message';
import SortComponent from '../components/SortComponent';

// data imports
// sortList data for sorting messages
import sortlist from '../../assets/data/sortList';

// redux modules import
import {useDispatch, useSelector} from 'react-redux';
import {fetchNoeuds, noeudsSelector} from '../redux/slices/noeuds';
import {
  fetchMessages,
  messagesSelector,
  getSortedMessages,
} from '../redux/slices/messagesByNoeud';

// Graphql apolo client import
import {GET_NODES, GET_MESSAGES_BY_NODE} from '../graphql/queries';

export const Home = props => {
  // State For active noeud
  const [selectedNoeud, setSelectedNoeud] = useState(
    '60dd18a767831b4344d4b0e2',
  );
  // State For sort messages
  const [visible, setVisible] = useState(false);
  const [sortText, setSortText] = useState({});
  const [sortBy, setSortBy] = useState(sortlist);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // Redux
  const dispatch = useDispatch();
  const {
    noeuds,
    isLoading: noeudsIsLoading,
    hasErrors: noeudsHasErrors,
  } = useSelector(noeudsSelector);
  const {
    messages,
    isLoading: messagesIsLoading,
    hasErrors: messagesHasErrors,
  } = useSelector(messagesSelector);

  //-------- fetch all nodes in graphqg database---------
  function Noeuds() {
    const {loading, error, data} = useQuery(GET_NODES);

    if (loading) {
      return <ActivityIndicator color={colors.primary} size={'small'} />;
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
        data={data.noeudMany}
        renderItem={renderNoeudItem}
        keyExtractor={item => item._id}
        extraData={selectedNoeud}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  const renderNoeudItem = ({item}) => {
    const color =
      item._id === selectedNoeud ? colors.primary : colors.secondary;
    return (
      <Noeud
        item={item}
        onPress={() => {
          setSelectedNoeud(item._id);
        }}
        textColor={color}
      />
    );
  };

  //------- fetch all message by node in graphql database ------

  function Messages(_id) {
    const {loading, error, data} = useQuery(GET_MESSAGES_BY_NODE, {
      variables: {_id},
    });

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
    return data.noeudById.messages.length === 0 ? (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          Aucun message publié sur ce noeud
        </Text>
      </View>
    ) : (
      <FlatList
        data={data.noeudById.messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    );
  }

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
  //------- fetch all message by node in graphql database end ------

  // Toggle Drawer function
  // ****click the menu to open the drawer***
  const toggleDrawer = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  // Open Search Page
  const openSearchPage = () => {
    props.navigation.navigate('SearchPage');
  };

  //For filters messages
  const handleSelectedSort = data => {
    const newSortOrder = sortBy.map(sort => {
      if (sort.label == data.label) {
        sort.isActive = true;
      } else {
        sort.isActive = false;
      }
      return sort;
    });
    setSortBy(newSortOrder);
    setSortText(data);
    dispatch(getSortedMessages({type: data.desc}));
    hideModal();
  };

  return (
    <View style={styles.homeBackground}>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <Ionicons
            name="menu"
            size={37}
            color="#000"
            onPress={() => {
              toggleDrawer();
            }}
          />
          <Text style={styles.appBar_text}>UL Board</Text>
          <Ionicons
            name="search-sharp"
            size={37}
            color="#000"
            onPress={() => {
              openSearchPage();
            }}
          />
        </View>
      </SafeAreaView>

      {/* Types of nodes */}
      <View style={styles.noeudWrapper}>{Noeuds()}</View>

      {/* Filters */}

      <Modal
        visible={visible}
        onDismiss={hideModal}
        animationType="slide"
        transparent={true}>
        <View style={styles.centeredModal}>
          <View style={styles.modalContainer}>
            <SortComponent
              data={sortBy}
              handleSelectedSort={handleSelectedSort}
              selectedColor={colors.primary}
              unselectedColor={colors.white}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.filtersWrapper}>
        <Text style={styles.filtersWrapperTitle}>
          {sortText && sortText.label}
        </Text>
        <Ionicons
          name="filter-sharp"
          size={30}
          color="#000"
          onPress={showModal}
        />
      </View>

      {/* Messages */}
      <View style={styles.messageWrapper}>{Messages(selectedNoeud)}</View>
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
  },
  appBar: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  appBar_text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  noeudWrapper: {
    marginTop: 35,
    paddingHorizontal: 30,
  },
  noeudListWrapper: {
    paddingVertical: 15,
  },
  filtersWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 35,
    justifyContent: 'flex-end',
  },
  filtersWrapperTitle: {
    color: '#0047FD',
    marginRight: 15,
    alignSelf: 'center',
    fontSize: 15,
  },
  messageWrapper: {
    flex: 1,
    paddingHorizontal: 35,
    marginBottom: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerStyle: {backgroundColor: 'white', padding: 20},
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    textAlign: 'center',
  },
});
export default Home;
