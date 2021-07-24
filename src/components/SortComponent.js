import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

//my imports
import colors from '../../assets/colors/colors';

const SortComponent = ({
  data,
  handleSelectedSort,
  selectedColor,
  unselectedColor,
}) => {
  const handleOnClick = item => {
    handleSelectedSort(item);
  };
  return (
    <View>
      {data.map(item => {
        return (
          <View style={styles.sortItem} key={item.label}>
            <View style={styles.controllerOutline}>
              <View style={styles.controllerCircle}>
                <Entypo
                  name="controller-record"
                  size={22}
                  color={item.isActive ? selectedColor : unselectedColor}
                  onPress={() => handleOnClick(item)}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => handleOnClick(item)}>
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  sortItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 3,
  },
  controllerOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  controllerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 25,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 18,
    marginLeft: 16,
    marginRight: 70,
    textTransform: 'capitalize',
  },
});

export default SortComponent;
