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
  Alert,
  Modal,
} from 'react-native';

import {Header} from 'react-native-elements';
import FormInput from '../utils/FormInput';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AlertModal from '../utils/AlertModal';
import Icon from 'react-native-vector-icons/Feather';

const AcknowledgementScreen = ({navigation}) => {
  const [getEmail, setEmail] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const [alertData, setAlertData] = useState({
    headText: '',
    bodyText: '',
    signOut: false,
  });

  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false);

  const changeSubscribeModalVisibility = bool => {
    setIsSubscribeModalVisible(bool);
  };

  const textInputChange = value => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
      });
    }
  };

  useEffect(() => {
    fetch('http://admin.icg.com.bd/api/getemail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(response => {
      response.json().then(userData => {
        setEmail(userData);
      });
    });
  }, []);

  const emailMatch =
    getEmail && data.email
      ? getEmail
          .filter(item => {
            return item.email_address === data.email;
          })
          .map(item => item)
      : data.email;

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
                  name="arrow-left"
                  size={25}
                  color="white"
                  onPress={() => navigation.goBack()}
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
          PASSWORD RESET
        </Text>
      </View>
      <View
        style={{
          flex: 0.86,
          padding: 20,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Enter your 'Registered' email address to recover your password.
            </Text>
            <View style={{marginTop: 30}}>
              <FormInput
                labelValue={data.email}
                onChangeText={value => textInputChange(value)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: '#006400',
                width: windowWidth / 4.4,
                height: windowWidth / 4.4,
                borderRadius: 100,
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (data.email !== '') {
                  if (emailMatch.length !== 0) {
                    fetch('https://admin.icg.com.bd/api/verificationcode', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                      },
                      body: JSON.stringify({
                        email_address: data.email,
                      }),
                    }).then(response => {
                      const getStatus = response.status;

                      if (getStatus === 200) {
                        console.log(response.status);
                        navigation.navigate('PassResetOtpScreen', {
                          email_address: data.email,
                        });
                      } else {
                        changeSubscribeModalVisibility(true);
                        setAlertData({
                          headText: 'Error!',
                          bodyText: 'Please check your Internet connection.',
                          signOut: false,
                        });
                      }
                    });
                  } else {
                    changeSubscribeModalVisibility(true);
                    setAlertData({
                      headText: 'Email not found.',
                      bodyText:
                        'Please enter a registered email address to continue.',
                      signOut: false,
                    });
                  }
                } else {
                  changeSubscribeModalVisibility(true);
                  setAlertData({
                    headText: 'Invalid Email.',
                    bodyText:
                      'Please enter a registered email address to continue.',
                    signOut: false,
                  });
                }
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
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  GO
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
      </View>
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

export default AcknowledgementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.86,
    padding: 20,
    alignItems: 'center',
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
});
