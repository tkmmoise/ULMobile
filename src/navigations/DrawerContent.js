import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer, TouchableRipple, Switch} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

export function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Text style={styles.appTitle}>UL Board</Text>
            </View>
          </View>

          <View style={styles.noeudTitle}>
            <Ionicons name="school" size={28} style={{marginRight: 15}} />
            <Text style={styles.title}>ECOLES</Text>
          </View>
          {/* Ecoles */}
          <Drawer.Section>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>CIC</Text>
                <View pointerEvents="none">
                  <Switch value={false} color={colors.primary} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>ENSI</Text>
                <View pointerEvents="none">
                  <Switch value={true} color={colors.primary} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>IUT-GESTION</Text>
                <View pointerEvents="none">
                  <Switch value={true} color={colors.primary} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>ISIA</Text>
                <View pointerEvents="none">
                  <Switch value={true} color={colors.primary} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          {/* Facultes */}
          <View style={styles.noeudTitle}>
            <Ionicons name="school" size={28} style={{marginRight: 15}} />
            <Text style={styles.title}>FACULTES</Text>
          </View>
          <Drawer.Section>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>FASEG</Text>
                <View pointerEvents="none">
                  <Switch value={true} color={colors.primary} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>FDD</Text>
                <View pointerEvents="none">
                  <Switch value={true} color={colors.primary} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>FSS</Text>
                <View pointerEvents="none">
                  <Switch value={true} color={colors.primary} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection} {...props}>
        <Drawer.Item
          icon="home"
          label="Home"
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
        <Drawer.Item icon="cog-outline" label="Paramètres" />
        <Drawer.Item icon="exit-to-app" label="Quitter" />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  appTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {},
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  noeudTitle: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
