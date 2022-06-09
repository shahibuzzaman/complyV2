import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {Title, Caption, Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Header} from 'react-native-elements';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsDrawerOpen} from '@react-navigation/drawer';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

import {AuthContext} from '../context';

let lastDrawerStateIsOpened = false;

const DrawerContent = ({navigation, props, useFocusEffect}) => {
  const {signOut} = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [dbUser, setDBUser] = useState(null);
  const [getImage, setImage] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 15000);
  }, []);

  const isOpened = useIsDrawerOpen();

  // useEffect(() => {
  //   const unsubscribe = () => {
  //     navigation.addListener('drawerOpen', e => {
  //       db.transaction(tx => {
  //         tx.executeSql('SELECT * FROM profile_image', [], (tx, results) => {
  //           var temp = [];
  //           for (let i = 0; i < results.rows.length; ++i)
  //             temp.push(results.rows.item(i));
  //           setImage(temp);
  //           console.log('temp', temp);
  //         });
  //       });
  //     });
  //   };
  //   return unsubscribe();
  // }, [navigation]);

  useEffect(() => {
    if (lastDrawerStateIsOpened !== isOpened) {
      lastDrawerStateIsOpened = isOpened;
      if (isOpened) {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM profile_image', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setImage(temp);
            console.log('temp', temp);
          });
        });
      }
    }
  }, [isOpened, lastDrawerStateIsOpened]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setDBUser(temp);
      });
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM profile_image', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setImage(temp);
        console.log('temp', temp);
      });
    });
  }, [loading]);

  console.log('dbUser', dbUser);

  const userName = dbUser ? dbUser.map(item => item.user_name) : null;
  const email = dbUser ? dbUser.map(item => item.email_address) : null;

  const dayLeft = dbUser ? dbUser.map(item => item.expire_date) : null;

  var expire_date = new Date(dayLeft).getTime();

  var dateToday = new Date().getTime();
  var Difference_In_Expire_Time = Math.round(expire_date - dateToday);

  var Difference_In_Expire_Days =
    Difference_In_Expire_Time / (1000 * 3600 * 24).toString();

  const PicLatter =
    userName !== null ? String(userName).charAt(0).toUpperCase() : null;

  const profileImage = getImage.length
    ? getImage.map(item => item.image)
    : null;

  console.log('img', profileImage);

  if (dbUser !== null && !loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.92}}>
        <LinearGradient
          style={{flex: 1}}
          start={{x: 0.0, y: 0.5}}
          end={{x: 0.5, y: 1.0}}
          colors={['#006400', '#FF0000']}>
          <DrawerContentScrollView {...props} style={{flex: 1, marginTop: 50}}>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: windowWidth / 3.8,
                    height: windowWidth / 3.8,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: windowWidth / 4,
                      height: windowWidth / 4,
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        width: windowWidth / 4,
                        height: windowWidth / 4,
                        borderRadius: 100,
                      }}
                      source={{
                        uri:
                          profileImage !== null
                            ? profileImage[0]
                            : 'https://randomuser.me/api/portraits/men/1.jpg',
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Title style={styles.title}>{userName}</Title>
                  <Caption style={styles.caption}>{email}</Caption>
                  <Title
                    style={{
                      fontSize: 20,
                      marginTop: 30,
                      height: 40,
                      width: 250,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      backgroundColor: '#FF0000',
                      color: 'white',
                      borderRadius: 10,
                    }}>
                    {Difference_In_Expire_Days > 0
                      ? 'Lifetime Subscriptions'
                      : 'Using Trial Periods!'}
                  </Title>
                </View>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="home-outline" color="white" size={30} />
                )}
                label={({focused, color}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 18, flexGrow: 1, color: 'white'}}>
                      Home
                    </Text>
                    <Icon name="chevron-right" color="white" size={30} />
                  </View>
                )}
                onPress={() => {
                  navigation.navigate('Home');
                }}
              />

              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="heart-outline" color="white" size={30} />
                )}
                label={({focused, color}) => (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, flexGrow: 1, color: 'white'}}>
                      Favorites
                    </Text>
                    <Icon name="chevron-right" color="white" size={30} />
                  </View>
                )}
                onPress={() => {
                  navigation.navigate('Details');
                }}
              />

              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="information-outline" color="white" size={30} />
                )}
                label={({focused, color}) => (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, flexGrow: 1, color: 'white'}}>
                      Support
                    </Text>
                    <Icon name="chevron-right" color="white" size={30} />
                  </View>
                )}
                onPress={() => {
                  navigation.navigate('Profile');
                }}
              />
            </Drawer.Section>
          </DrawerContentScrollView>
        </LinearGradient>
      </View>

      <View style={{flex: 0.08, backgroundColor: '#FF0000'}}>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color="white" size={30} />
            )}
            label={({focused, color}) => (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 18, color: 'white'}}>Sign Out</Text>
              </View>
            )}
            onPress={() => {
              signOut();
              db.transaction(function (tx) {
                tx.executeSql('DELETE FROM users');
              });
            }}
          />
        </Drawer.Section>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    flex: 0.5,
  },
  title: {
    fontSize: 18,
    marginTop: 20,
    color: 'white',
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 30,
    flex: 0.5,
    marginRight: -20,
  },
  bottomDrawerSection: {
    flex: 1,
    paddingLeft: 20,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
