import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

export function Loading() {
  return <ActivityIndicator style={styles.loadingIndicator} />;
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary,
  },
});
