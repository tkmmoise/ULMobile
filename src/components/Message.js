import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

//colors
import colors from '../../assets/colors/colors';
const Message = ({item, onPress}) => {
  return (
    <TouchableOpacity key={item._id} onPress={onPress}>
      <View style={[styles.messageCardWrapper]}>
        <View style={styles.messageCardHeader}>
          <View style={styles.messageCardLeft}>
            <Image
              style={styles.messageCardImage}
              source={require('../../assets/images/ciclogo.png')}
            />
          </View>
          <View style={styles.messageCardRight}>
            <Text style={styles.messageCardRightTitle}>
              {item.messageObject}
            </Text>
            <Text>
              Par{' '}
              <Text style={styles.messageCardRightAuthor}>{item.senderId}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.messageCardBottom}>
          <Text style={styles.messageCardBottomText}>
            Publie le {item.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageCardWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
    width: '100%',
    marginTop: 20,
  },
  messageCardHeader: {
    flexDirection: 'row',
    margin: 10,
  },
  messageCardLeft: {
    height: 63,
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  messageCardRight: {
    marginLeft: 10,
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  messageCardRightTitle: {
    fontSize: 15,
    fontFamily: 'Montserrat_500Medium',
  },
  messageCardRightAuthor: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
  },
  messageCardImage: {
    resizeMode: 'contain',
  },
  messageCardBottom: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageCardBottomText: {
    fontSize: 11,
    fontFamily: 'Montserrat_400Regular',
  },
});

export default Message;
