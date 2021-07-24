import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//colors
import colors from '../../assets/colors/colors';

const Noeud = ({item, onPress, textColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.noeudItemWrapper]}>
        <Text style={[styles.noeudItemTitle, {color: textColor}]}>
          {item.acronym}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noeudItemWrapper: {
    marginRight: 10,
  },
  noeudItemTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 20,
    color: colors.secondary,
  },
});

export default Noeud;
