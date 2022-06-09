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
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import RegPaymentModal from '../utils/RegPaymentModal';
import {Header} from 'react-native-elements';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {openDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../utils/AlertModal';

var db = openDatabase({name: 'Compliance.db'});

const SubscriptionScreen = ({navigation, route}) => {
  const [dbUser, setDBUser] = useState(null);
  const [subject, setSubject] = useState('');
  const [feedback, setFeedback] = useState('');

  const [alertData, setAlertData] = useState({
    headText: '',
    bodyText: '',
    signOut: false,
    navigate: false,
  });

  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false);

  const changeSubscribeModalVisibility = bool => {
    setIsSubscribeModalVisible(bool);
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setDBUser(temp);
      });
    });
  }, []);

  const email = dbUser ? dbUser.map(item => item.email_address) : null;

  console.log('email', email);
  console.log(subject);
  console.log(feedback);

  console.log('email', email);
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
          FEEDBACK
        </Text>
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flex: 1}}>
          <View style={{margin: 10}}></View>
          <Text style={{fontSize: 16}}>Email Address</Text>
          <View
            style={{
              marginTop: 5,
              marginBottom: 5,
              width: '100%',
              height: windowHeight / 15,
              borderColor: '#ccc',
              borderRadius: 5,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <TextInput
              autoCapitalize="none"
              numberOfLines={1}
              defaultValue={email ? email[0] : null}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={{margin: 10}}></View>
          <Text style={{fontSize: 16}}>Subject</Text>
          <View
            style={{
              marginTop: 5,
              marginBottom: 5,
              width: '100%',
              height: windowHeight / 15,
              borderColor: '#ccc',
              borderRadius: 5,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <TextInput
              placeholder="Subject"
              style={styles.textInput}
              autoCapitalize="none"
              numberOfLines={2}
              onChangeText={value => setSubject(value)}
            />
          </View>
          <View style={{margin: 10}}></View>
          <Text style={{fontSize: 16}}>Feedback</Text>
          <View
            style={{
              marginTop: 5,
              marginBottom: 5,
              width: '100%',
              height: windowHeight / 5,
              borderColor: '#ccc',
              borderRadius: 5,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <TextInput
              placeholder="Write your Feedback here"
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                textAlignVertical: 'top',
              }}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={5}
              onChangeText={value => setFeedback(value)}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#006400',
                width: windowWidth / 4.4,
                height: windowWidth / 4.4,
                borderRadius: 100,
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                fetch('https://admin.icg.com.bd/api/feedback', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                  body: JSON.stringify({
                    email_address: email[0],
                    name: subject,
                    text: feedback,
                  }),
                }).then(response => {
                  const getStatus = response.status;

                  if (getStatus === 201) {
                    changeSubscribeModalVisibility(true);
                    setAlertData({
                      headText: 'Successful.',
                      bodyText:
                        'Feedback submit has successful. Our team will review. Thank you.',
                      signOut: false,
                      navigate: true,
                    });
                  } else {
                    changeSubscribeModalVisibility(true);
                    setAlertData({
                      headText: 'Feedback send failed.',
                      bodyText:
                        'Your feedback send has failed. Please fill the input form properly and send to us. Thank you.',
                      signOut: false,
                    });
                  }
                });
              }}>
              <View
                style={{
                  backgroundColor: '#FF0000',
                  width: windowWidth / 5.3,
                  height: windowWidth / 5.3,
                  borderRadius: 100,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  SEND
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isSubscribeModalVisible}
          nRequestClose={() => changeSubscribeModalVisibility(false)}>
          <AlertModal
            changeModalVisibility={changeSubscribeModalVisibility}
            navigation={navigation}
            alertData={alertData}
          />
        </Modal>
      </KeyboardAwareScrollView>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}></View>
    </Animated.View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.86,
    padding: 10,
    backgroundColor: 'white',
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});
