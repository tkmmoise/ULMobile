import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import moment from 'moment';

//colors
import colors from '../../assets/colors/colors';
const Message = ({item, scale, onPress}) => {
  return (
    <TouchableOpacity key={item._id} onPress={onPress}>
      <Animated.View
        style={[styles.messageCardWrapper, {transform: [{scale}]}]}>
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
              <Text style={styles.messageCardRightAuthor}>
                {item.sender?.name}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.messageCardBottom}>
          <Text style={styles.messageCardBottomText}>
            Publie le {moment(item.date).format('DD/MM/YY hh:mm')}
          </Text>
        </View>
      </Animated.View>
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
    marginBottom: 20,
    padding: 10,
  },
  messageCardHeader: {
    flexDirection: 'row',
    backgroundColor: 'red',
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
