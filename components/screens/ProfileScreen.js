import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Animated,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import {Header} from 'react-native-elements';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

const SubscriptionScreen = ({navigation, route}) => {
  const options = [
    {
      id: 1,
      name: 'Change Password',
      icon: 'lock-open-alert',
    },
    {
      id: 2,
      name: 'Change Profile Picture',
      icon: 'account-edit',
    },
    {
      id: 3,
      name: 'How to use',
      icon: 'help-box',
    },
    {
      id: 4,
      name: 'FAQ',
      icon: 'clipboard-alert',
    },
    {
      id: 5,
      name: 'Announcement',
      icon: 'bullhorn',
    },
    {
      id: 6,
      name: 'Feedback',
      icon: 'heart-half-full',
    },
  ];

  const [token, setToken] = useState('');
  const [howToUseData, setHowToUseData] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [announcementData, setAnnouncementData] = useState(null);

  const categoryList = (item, index) => {
    console.log('A', item.item);
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          height: windowWidth / 2.5,
          width: windowWidth / 2 - 20,
          margin: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => navigation.navigate(`${item.item.name}`)}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={item.item.icon} size={50} color="red" />
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
            {item.item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const TokenValue = async () => {
    try {
      let value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        setToken(JSON.parse(value));
      }
    } catch (e) {}
  };

  useEffect(() => {
    TokenValue();
  }, []);

  useEffect(() => {
    if (token) {
      console.log('token3', token.getToken);
      fetch('https://admin.icg.com.bd/api/howtouse', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(result => {
          setHowToUseData(result);
        });
      });

      fetch('https://admin.icg.com.bd/api/faq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(result => {
          setFaqData(result);
        });
      });

      fetch('https://admin.icg.com.bd/api/announcement', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(result => {
          setAnnouncementData(result);
        });
      });
    }
  }, [token]);

  const how_to_use_post = howToUseData => {
    if (howToUseData !== null) {
      db.transaction(function (tx) {
        tx.executeSql('DELETE FROM how_to_use');

        for (var i = 0; i < howToUseData.length; i++) {
          tx.executeSql('INSERT INTO how_to_use (id, text) VALUES (?,?)', [
            howToUseData[i].id,
            howToUseData[i].text,
          ]);
        }
      });
    }
  };

  const faq_post = faqData => {
    if (faqData !== null) {
      db.transaction(function (tx) {
        tx.executeSql('DELETE FROM faq');

        for (var i = 0; i < faqData.length; i++) {
          tx.executeSql('INSERT INTO faq (id, text) VALUES (?,?)', [
            faqData[i].id,
            faqData[i].text,
          ]);
        }
      });
    }
  };

  const announcement_post = announcementData => {
    if (announcementData !== null) {
      db.transaction(function (tx) {
        tx.executeSql('DELETE FROM announcement');

        for (var i = 0; i < announcementData.length; i++) {
          tx.executeSql(
            'INSERT INTO announcement (id, announcement) VALUES (?,?)',
            [announcementData[i].id, announcementData[i].announcment],
          );
        }
      });
    }
  };

  useEffect(() => {
    if (howToUseData && faqData && announcementData !== null)
      how_to_use_post(howToUseData);
    faq_post(faqData);
    announcement_post(announcementData);
  }, [howToUseData, faqData, announcementData]);

  console.log('token', token);
  console.log('how', howToUseData);
  console.log('faq', faqData);
  console.log('announcement', announcementData);

  return (
    <Animated.View style={{flex: 1}}>
      <View>
        <Header
          statusBarProps={{
            barStyle: 'light-content',
            translucent: true,
            backgroundColor: '#006400',
          }}
          backgroundColor="#006400">
          <View
            style={{
              width: windowWidth - 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.08}}>
              <TouchableOpacity
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Icon
                  name="menu"
                  size={25}
                  color="white"
                  onPress={() => navigation.openDrawer()}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.92,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: -windowWidth / 13,
              }}>
              <View>
                <Image
                  style={{
                    width: windowWidth / 10,
                    height: windowWidth / 10,
                    marginRight: 5,
                  }}
                  resizeMode="contain"
                  source={require('../assets/Logo-glow.png')}
                />
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: -5,
                }}>
                Compliance Laws (BD)
              </Text>
            </View>
          </View>
        </Header>
      </View>
      <View
        style={{
          flex: 0.06,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#FBB117', fontSize: 16, fontWeight: 'bold'}}>
          SUPPORT
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={options}
          renderItem={categoryList}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{color: 'white', fontSize: 18}}>
          Tap on any Item to Proceed
        </Text>
      </View>
    </Animated.View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.86,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotButton: {
    marginVertical: 10,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  itemStyle: {
    backgroundColor: 'white',

    height: windowWidth / 2 - 12,
    width: windowWidth / 2 - 12,
    flex: 1,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemText: {
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
