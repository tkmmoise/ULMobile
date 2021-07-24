import React from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

//My import
import colors from '../../assets/colors/colors';

export const Started = props => {
  return (
    <ImageBackground
      source={require('../../assets/images/back.png')}
      style={styles.background}>
      <View style={styles.div1}>
        <View style={styles.height50}>
          <Text> </Text>
        </View>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <View>
          <Text style={styles.title}>UL Board</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus a eu
            vestibulum massa eu. Porttitor felis, blandit pulvinar faucibus
            magna
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.replace('Home');
          }}>
          <Text style={styles.button_text}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  div1: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  height50: {
    height: 50,
  },
  logo: {
    // backgroundColor: "red"
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
  },
  description: {
    textAlign: 'center',
    marginHorizontal: 50,
    lineHeight: 19,
    letterSpacing: 0.6,
    fontFamily: 'Montserrat_400Regular',
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    paddingHorizontal: 32,
    height: 60,
    elevation: 1,
    width: 325,
    borderRadius: 15,
    alignSelf: 'center',
    marginLeft: 5,
    paddingVertical: 20,
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
});

export default Started;
