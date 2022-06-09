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
import RegAlertModal from '../utils/RegAlertModal';

const OtpScreen = ({route, navigation}) => {
  const {
    user_name,
    mobile_no,
    email_address,
    password,
    mac_address,
  } = route.params;
  const [internalVal, setInternalVal] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
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
          REGISTRATION
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
              }}>
              A Verification Code has been sent to your Email address and Mobile
              number. Please check and enter below:
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
                    navigation.navigate('PaymentScreen', {
                      user_name: user_name,
                      mobile_no: mobile_no,
                      email_address: email_address,
                      password: password,
                      mac_address: mac_address,
                    });
                  } else {
                    changeModalVisibility(true);
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
                    fontSize: 30,
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
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}>
          <RegAlertModal changeModalVisibility={changeModalVisibility} />
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
