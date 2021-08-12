import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import colors from '../../assets/colors/colors';

//graphql
import {GET_NODES} from '../graphql/queries';
import {useQuery} from '@apollo/client';
import {currentSelectedNoeudsIds} from '../config/cache';

export function DrawerContent(props) {
  //fetch all nodes
  const {data} = useQuery(GET_NODES);
  const noeuds = data?.noeudMany;
  const currentSelectedNoeuds = currentSelectedNoeudsIds();
  console.log('noueuds select', currentSelectedNoeuds);

  const toggleNoeudSelected = noeudId => {
    const allSelectedNoeuds = currentSelectedNoeudsIds();
    const found = !!allSelectedNoeuds.find(t => t === noeudId);

    if (found) {
      currentSelectedNoeudsIds(allSelectedNoeuds.filter(t => t !== noeudId));
    } else {
      currentSelectedNoeudsIds(allSelectedNoeuds.concat(noeudId));
    }
  };

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
            <Text style={styles.title}>ECOLES / FACULTES</Text>
          </View>
          {/* Ecoles */}
          <Drawer.Section>
            {noeuds?.map(noeud => {
              return (
                <TouchableRipple key={noeud._id}>
                  <View style={styles.preference}>
                    <Text>{noeud.acronym}</Text>
                    <View>
                      <Switch
                        value={noeud.isSelected}
                        trackColor={{
                          false: colors.textLight,
                          true: colors.primary,
                        }}
                        thumbColor={
                          noeud.isSelected ? colors.primary : '#f4f3f4'
                        }
                        color={colors.primary}
                        onValueChange={() => toggleNoeudSelected(noeud._id)}
                      />
                    </View>
                  </View>
                </TouchableRipple>
              );
            })}
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
          style={styles.drawerItem}
        />
        <Drawer.Item icon="cog-outline" label="Paramètres" />
        <Drawer.Item icon="exit-to-app" label="Quitter" />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContentscrollView: {
    justifyContent: 'space-between',
  },
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
    marginTop: -10,
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
  bottomDrawerSection: {
    //backgroundColor: colors.textDark,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  drawerItem: {
    color: colors.textDark,
  },
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
