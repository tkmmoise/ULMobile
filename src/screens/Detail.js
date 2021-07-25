import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@apollo/client';

// Graphql apolo client import
import {GET_MESSAGE} from '../graphql/queries';

//My imports
import colors from '../../assets/colors/colors';

const Detail = ({route, navigation}) => {
  const {id} = route.params;

  function Message(_id) {
    const {loading, error, data} = useQuery(GET_MESSAGE, {
      variables: {_id},
    });

    if (loading) {
      return (
        <ActivityIndicator
          color={colors.primary}
          size={'small'}
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
      <>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerWrapperTop}>
            <Text style={styles.messageTitle}>
              {data.messageById.messageObject}
            </Text>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/ciclogo.png')}
              />
            </View>
          </View>
          <View style={styles.headerWrapperBottom}>
            <Text>
              Par{' '}
              <Text style={styles.messageAuthor}>
                {data.messageById.sender.name}
              </Text>
            </Text>
            <Text style={styles.messageTextDate}>
              Publié {data.messageById.date}
            </Text>
          </View>
        </View>

        {/* Contenu */}
        <View style={styles.container2}>
          <Text style={styles.title}>Contenu</Text>
          <Text style={styles.text}>{data.messageById.messageContent}</Text>
        </View>
      </>
    );
  }

  return (
    <View style={styles.detailBackground}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Ionicons
            name="arrow-back"
            size={37}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Ionicons name="ellipsis-vertical" size={37} color="#000" />
        </View>
      </SafeAreaView>
      <ScrollView>
        {Message(id)}
        {/* Pieces Jointes */}
        <View style={{...styles.container2, marginBottom: 30}}>
          <Text style={styles.title}>Pièces jointes</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    marginTop: StatusBar.currentHeight,
  },
  topBar: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  headerWrapper: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    marginTop: 50,
  },
  headerWrapperTop: {
    flexDirection: 'row',
  },
  messageTitle: {
    flex: 2,
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
    marginRight: 10,
  },
  logoWrapper: {
    flex: 1,
  },
  logo: {
    width: 107,
    height: 80,
    resizeMode: 'contain',
  },
  headerWrapperBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  messageAuthor: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
  },
  messageTextDate: {
    fontSize: 12,
    fontFamily: 'Montserrat_500Medium',
  },
  container2: {
    paddingHorizontal: 35,
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
  },
  text: {
    marginTop: 10,
    fontFamily: 'Montserrat_400Regular',
    letterSpacing: 0.05,
    lineHeight: 21,
    fontSize: 14,
    color: colors.paragraph,
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    height: 45,
    elevation: 1,
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 13,
    marginTop: 20,
  },
  button_text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 19,
    letterSpacing: 0.6,
    fontFamily: 'Montserrat_700Bold',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Detail;
