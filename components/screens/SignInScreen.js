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
  KeyboardAvoidingView,
  Alert,
  Modal,
} from 'react-native';
import {Header} from 'react-native-elements';
import FormInput from '../utils/FormInput';
import FormPasswordInput from '../utils/FormPasswordInput';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import Icon from 'react-native-vector-icons/Feather';
import {getIpAddress, getMacAddress} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../utils/AlertModal';
import CheckConnection from '../utils/CheckConnection';

import {AuthContext} from '../context';

const SignInScreen = ({navigation}) => {
  const [macAddress, setMacAddress] = useState('');
  const [getLoginValue, setLoginValue] = useState('');
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

  const {signIn} = React.useContext(AuthContext);

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

  const handlePasswordChange = value => {
    setData({
      ...data,
      password: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  useEffect(() => {
    let isMounted = true;

    getMacAddress().then(mac => {
      if (isMounted) setMacAddress(mac);
    });

    return () => {
      isMounted = false;
    };
  }, [getMacAddress]);

  const email_address = data.email;
  const password = data.password;

  const loginHandler = (email_address, password, macAddress) => {
    signIn(email_address, password, macAddress);
  };

  let network = CheckConnection();

  console.log('mac', macAddress);
  console.log('login Data', data);
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
          LOGIN
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
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          style={styles.containerAvoidingView}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}>
              Registered user LOGIN here ...
            </Text>
            <FormInput
              labelValue={data.email}
              onChangeText={value => textInputChange(value)}
              placeholderText="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormPasswordInput
              labelValue={data.password}
              onChangeText={value => handlePasswordChange(value)}
              placeholderText="Password"
              iconType="lock"
              updateSecureTextEntry={updateSecureTextEntry}
              secureTextEntry={data.secureTextEntry ? true : false}
            />
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => {
                navigation.navigate('PassResetScreen');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#2e64e5',
                  textAlign: 'right',
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
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
                  if (network === true) {
                    if (data.email !== '' && data.password !== '') {
                      loginHandler(email_address, password, macAddress);
                    } else {
                      changeSubscribeModalVisibility(true);
                      setAlertData({
                        headText: 'Invalid Input.',
                        bodyText: 'Please fill all the input section properly.',
                        signOut: false,
                      });
                    }
                  } else {
                    changeSubscribeModalVisibility(true);
                    setAlertData({
                      headText: 'SORRY! You are Not Connected to the Internet.',
                      bodyText: 'To LOGIN, please Connect to the Internet.',
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
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.navButton}>
                <TouchableOpacity
                  style={styles.forgotButton}
                  onPress={() => navigation.navigate('AckScreen')}>
                  <Text style={styles.navButtonText1}>
                    Don't have an account? {'\n'}{' '}
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                      Register Now.
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
        <Text style={{color: 'white', fontSize: 18}}></Text>
      </View>
    </Animated.View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.86,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotButton: {
    marginVertical: 5,
  },
  navButtonText1: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    textAlign: 'center',
  },
  navButtonText: {},
});
