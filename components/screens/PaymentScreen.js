import React, {useEffect, useState} from 'react';
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
} from 'react-native';

import {Header} from 'react-native-elements';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PaymentScreen = ({route, navigation}) => {
  const {
    user_name,
    mobile_no,
    email_address,
    password,
    mac_address,
  } = route.params;

  const [reg_data, setRegData] = useState('');

  useEffect(() => {
    console.log(user_name, mobile_no, email_address, password, mac_address);
    fetch('https://admin.icg.com.bd/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user_name: user_name,
        mobile_no: mobile_no,
        email_address: email_address,
        password: password,
        mac_address: mac_address,
      }),
    }).then(response => {
      const getStatus = response.status;
      response.json().then(result => {
        console.log('register', result);
        setRegData(result);
      });

      if (getStatus === 201) {
        console.log('code', response.status);
      }
      // } else {
      //   Alert.alert(
      //     'Registration failed',
      //     'My Alert Msg',
      //     [
      //       {
      //         text: 'Ask me later',
      //         onPress: () => console.log('Ask me later pressed'),
      //       },
      //       {
      //         text: 'Cancel',
      //         onPress: () => console.log('Cancel Pressed'),
      //         style: 'cancel',
      //       },
      //       {text: 'OK', onPress: () => console.log('OK Pressed')},
      //     ],
      //     {cancelable: false},
      //   );
      // }
    });
  }, [user_name, mobile_no, email_address, password, mac_address]);
  return (
    <Animated.View style={{flex: 1, backgroundColor: 'white'}}>
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
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 30,
            }}>
            Congratulations! {'\n'}{' '}
            <Text style={{fontSize: 14, fontWeight: 'normal'}}>
              Your 'User Profile' is created Successfully.
            </Text>
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>
            To enjoy 7 days <Text style={{fontWeight: 'bold'}}>'FREE'</Text>{' '}
            Trial, go to LOGIN. {'\n'} Remember, after 7 days you have to
            Subscribe to use the App. Otherwise all features will be
            Non-functional.
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#006400',
                width: windowWidth / 5,
                height: windowWidth / 5,
                borderRadius: 100,
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.replace('SignInScreen');
              }}>
              <View
                style={{
                  backgroundColor: '#FF0000',
                  width: windowWidth / 6,
                  height: windowWidth / 6,
                  borderRadius: 100,
                  justifyContent: 'center',
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
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>
            If you know the contents of the App {'\n'} and ready to{' '}
            <Text style={{fontWeight: 'bold'}}>'Subscribe'</Text>
            {'\n'} Tap below to{' '}
            <Text style={{fontWeight: 'bold'}}>'Make Payment'.</Text>
          </Text>
          <Text style={{fontSize: 16, marginTop: 20, textAlign: 'center'}}>
            This will allow you to use the App without any interruption.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SubsScreen', {
            reg_id: reg_data.id,
          })
        }
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Make Payment</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PaymentScreen;

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
