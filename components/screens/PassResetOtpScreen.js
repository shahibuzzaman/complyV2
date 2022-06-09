import React, {useState} from 'react';
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
import {windowHeight, windowWidth} from '../utils/Dimensions';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OtpInput from '../utils/OtpInput';
import Icon from 'react-native-vector-icons/Feather';
import AlertModal from '../utils/AlertModal';

const OtpScreen = ({route, navigation}) => {
  const {email_address} = route.params;
  const [internalVal, setInternalVal] = useState('');

  const [alertData, setAlertData] = useState({
    headText: '',
    bodyText: '',
    signOut: false,
  });

  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false);

  const changeSubscribeModalVisibility = bool => {
    setIsSubscribeModalVisible(bool);
  };

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
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1,
              }}>
              A verification Code has been sent to your Registered Email address
              and Registered Mobile number. Please enter the Code below:
            </Text>
          </View>
          <View style={{flex: 1}}>
            <OtpInput
              setInternalVal={setInternalVal}
              internalVal={internalVal}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
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
                fetch('https://admin.icg.com.bd/api/verify', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                  body: JSON.stringify({
                    email_address: email_address,
                    code: internalVal,
                  }),
                }).then(response => {
                  const getStatus = response.status;

                  console.log('res', response);

                  if (getStatus === 200) {
                    console.log('code', response.status);
                    navigation.navigate('NewPassword', {
                      email_address: email_address,
                    });
                  } else {
                    changeSubscribeModalVisibility(true);
                    setAlertData({
                      headText: 'Invalid OTP !',
                      bodyText: 'Please re-enter OTP.',
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
                  alignItems: 'center',
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
        }}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          If not found in the INBOX. {'\n'} Please check "Junk/Spam" folder.
        </Text>
      </View>
    </Animated.View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.86,
    padding: 20,
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
});
