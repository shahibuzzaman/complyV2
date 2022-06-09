import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import {Header} from 'react-native-elements';
import {windowWidth} from '../utils/Dimensions';
import {useNetInfo} from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';

import LawScreen from './LawScreen';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckConnection from '../utils/CheckConnection';
import NetworkModal from '../utils/NetworkModal';
import ModalPicker from '../utils/ModalPicker';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [dbUser, setDBUser] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [lawData, setLawData] = useState(null);
  const [lawChapters, setLawChapter] = useState(null);
  const [lawSections, setLawSection] = useState(null);
  const [lawArticles, setLawArticle] = useState(null);
  const [getDateTime, setDateTime] = useState(null);

  let [allLaws, setAllLaws] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
  };
  const changeSearchModalVisibility = bool => {
    setIsSearchModalVisible(bool);
  };

  const netInfo = useNetInfo();
  // console.log('net-info', netInfo);

  const TokenValue = async () => {
    try {
      let value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        setToken(JSON.parse(value));
      }
    } catch (e) {}
  };

  let network = CheckConnection();
  // console.log('net-status', network);

  useEffect(() => {
    if (network === true) {
      fetch('https://admin.icg.com.bd/api/timeanddate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(result => {
          setDateTime(result);
        });
      });
    } else {
      changeModalVisibility(true);
    }
  }, [network]);

  useEffect(() => {
    TokenValue();
    if (getDateTime !== null) {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='compliance_laws'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS compliance_laws', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS compliance_laws(id INTEGER , law_title VARCHAR(200), law_icon TEXT, print_serial INT, published_status VARCHAR(1))',
                [],
              );
              txn.executeSql('DROP TABLE IF EXISTS law_chapters', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS law_chapters(id INTEGER , compliance_law_id INT, chapter_no VARCHAR(100), chapter_title VARCHAR(200), print_serial INT, published_status VARCHAR(1))',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS chapter_sections', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS chapter_sections(id INTEGER , law_chapter_id INT, section_no VARCHAR(100), section_title VARCHAR(400), print_serial INT, published_status VARCHAR(1))',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS articles', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS articles(id INTEGER , chapter_section_id INT, articles TEXT, published_status VARCHAR(1))',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS users', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS users(id INTEGER , user_name VARCHAR(100), mobile_no VARCHAR(24), email_address VARCHAR(80), expire_date TEXT, trial_registration_date TEXT, is_trial INTEGER, status VARCHAR(1))',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS search_history', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS search_history(search_id INTEGER PRIMARY KEY AUTOINCREMENT , search_value VARCHAR(100))',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS how_to_use', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS how_to_use(id INTEGER, text TEXT)',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS faq', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS faq(id INTEGER, text TEXT)',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS announcement', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS announcement(id INTEGER, announcement TEXT)',
                [],
              );

              txn.executeSql('DROP TABLE IF EXISTS profile_image', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS profile_image(img_id INTEGER PRIMARY KEY AUTOINCREMENT, image BLOB)',
                [],
              );
            }
          },
        );
      });
    }
  }, [getDateTime]);

  // console.log('token', token);

  const setUserInfo = async token => {
    await fetch('https://admin.icg.com.bd/api/auth/customer/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'bearer ' + token.getToken,
      },
    }).then(response => {
      response.json().then(async userData => {
        setUser(userData);
        await AsyncStorage.setItem(
          'UserInfo',
          JSON.stringify({
            user: userData,
          }),
        );
      });
    });
  };

  useEffect(() => {
    if (token) {
      setUserInfo(token);
      console.log('token3', token.getToken);
      fetch('https://admin.icg.com.bd/api/compliancelaws', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(userData => {
          setLawData(userData);
        });
      });

      fetch('https://admin.icg.com.bd/api/lawchapters', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(userData => {
          setLawChapter(userData);
        });
      });

      fetch('https://admin.icg.com.bd/api/chaptersections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(userData => {
          setLawSection(userData);
        });
      });

      fetch('https://admin.icg.com.bd/api/articles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(userData => {
          setLawArticle(userData);
          // console.log('articledata', userData);
        });
      });
    }
  }, [token]);

  useEffect(() => {
    if (user !== null) {
      db.transaction(function (tx) {
        tx.executeSql('DELETE FROM users');
        tx.executeSql(
          'INSERT INTO users (id, user_name, mobile_no, email_address, expire_date, trial_registration_date, is_trial, status) VALUES (?,?,?,?,?,?,?,?)',
          [
            user.id,
            user.user_name,
            user.mobile_no,
            user.email_address,
            user.expire_date,
            user.trial_registration_date,
            user.is_trial,
            user.status,
          ],
        );
      });
    }

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setDBUser(temp);
      });
    });
  }, [user]);

  const compliance_laws_post = lawData => {
    if (lawData !== null) {
      db.transaction(function (tx) {
        tx.executeSql('DELETE FROM compliance_laws');

        for (var i = 0; i < lawData.length; i++) {
          tx.executeSql(
            'INSERT INTO compliance_laws (id, law_title, law_icon, print_serial, published_status) VALUES (?,?,?,?,?)',
            [
              lawData[i].id,
              lawData[i].law_title,
              lawData[i].law_icon,
              lawData[i].print_serial,
              lawData[i].published_status,
            ],
          );
        }
      });
    }
  };

  useEffect(() => {
    if (lawData !== null) {
      compliance_laws_post(lawData);
    }
  }, [lawData]);

  const law_chapter_post = lawChapters => {
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM law_chapters');

      for (var i = 0; i < lawChapters.length; i++) {
        tx.executeSql(
          'INSERT INTO law_chapters (id, compliance_law_id, chapter_no, chapter_title, print_serial, published_status) VALUES (?,?,?,?,?,?)',
          [
            lawChapters[i].id,
            lawChapters[i].compliance_law_id,
            lawChapters[i].chapter_no,
            lawChapters[i].chapter_title,
            lawChapters[i].print_serial,
            lawChapters[i].published_status,
          ],
        );
      }
    });
  };

  const law_section_post = lawSections => {
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM chapter_sections');

      for (var i = 0; i < lawSections.length; i++) {
        tx.executeSql(
          'INSERT INTO chapter_sections (id, law_chapter_id, section_no, section_title, print_serial, published_status) VALUES (?,?,?,?,?,?)',
          [
            lawSections[i].id,
            lawSections[i].law_chapter_id,
            lawSections[i].section_no,
            lawSections[i].section_title,
            lawSections[i].print_serial,
            lawSections[i].published_status,
          ],
        );
      }
    });
  };

  const law_article_post = lawArticles => {
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM articles');

      for (var i = 0; i < lawArticles.length; i++) {
        tx.executeSql(
          'INSERT INTO articles (id, chapter_section_id, articles, published_status) VALUES (?,?,?,?)',
          [
            lawArticles[i].id,
            lawArticles[i].chapter_section_id,
            lawArticles[i].articles,
            lawArticles[i].published_status,
          ],
        );
      }
    });
  };

  useEffect(() => {
    if (lawChapters !== null && lawSections !== null) {
      law_chapter_post(lawChapters);
      law_section_post(lawSections);
    }
  }, [lawChapters, lawSections]);

  useEffect(() => {
    if (lawArticles !== null) {
      law_article_post(lawArticles);
    }
  }, [lawArticles]);

  // console.log('555', getDateTime);

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
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: '80%',
              width: '80%',
              marginLeft: '-90%',
              marginRight: -100,
            }}
            resizeMode="contain"
            source={require('../assets/icg.png')}
          />
          <Text
            style={{
              color: '#FBB117',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            ICG.COM.BD
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Image
            style={{height: '90%', width: '90%', marginLeft: '30%'}}
            resizeMode="contain"
            source={require('../assets/Logo.png')}
          /> */}
        </View>
      </View>
      <View style={{flex: 0.86, backgroundColor: 'white'}}>
        {dbUser.length !== 0 && getDateTime !== null ? (
          <View>
            <LawScreen
              navigation={navigation}
              laws={lawData}
              dbUser={dbUser}
              chapters={chapters}
              sections={sections}
              articles={articles}
              setChapters={setChapters}
              setSections={setSections}
              setArticles={setArticles}
              getDateTime={getDateTime}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#FF0000" />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderColor: 'white',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>
            Tap on any Item to Proceed
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            changeSearchModalVisibility(true);
          }}
          disabled={articles.length === 0}
          style={{flex: 0.2, alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Icon
              name="search"
              size={25}
              color={articles.length === 0 ? 'green' : 'white'}
            />
            <Text style={{fontSize: 12, color: 'white'}}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}>
        <NetworkModal
          changeModalVisibility={changeModalVisibility}
          navigation={navigation}
        />
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSearchModalVisible}
        nRequestClose={() => changeSearchModalVisibility(false)}>
        <ModalPicker
          changeModalVisibility={changeSearchModalVisibility}
          articles={articles}
          navigation={navigation}
          sections={sections}
        />
      </Modal>
    </Animated.View>
  );
};

export default HomeScreen;
