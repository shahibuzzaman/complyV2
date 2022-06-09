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
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getIpAddress, getMacAddress} from 'react-native-device-info';
import AlertModal from '../utils/AlertModal';

const SignUpScreen = ({navigation}) => {
  const [macAddress, setMacAddress] = useState('');
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    check_textInputChange: false,
    check_emailInputChange: false,
    check_phoneInputChange: false,
    check_passwordInputChange: false,
    check_passwordConfirmInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
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

  const nameInputChange = value => {
    if (value.length >= 4) {
      setData({
        ...data,
        userName: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        userName: '',
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const emailInputChange = value => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.length !== 0 && reg.test(value)) {
      setData({
        ...data,
        email: value,
        check_emailInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: '',
        check_emailInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const phoneNumberInputChange = value => {
    if (value.length >= 11) {
      setData({
        ...data,
        phoneNumber: value,
        check_phoneInputChange: true,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        phoneNumber: '',
        check_phoneInputChange: false,
        isValidPhone: false,
      });
    }
  };

  const handlePasswordChange = value => {
    if (value.length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
        check_passwordInputChange: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
        check_passwordInputChange: false,
      });
    }
  };

  const handleConfirmPasswordChange = value => {
    if (value === data.password) {
      setData({
        ...data,
        confirmPassword: value,
        check_passwordConfirmInputChange: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: '',
        check_passwordConfirmInputChange: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  useEffect(() => {
    getMacAddress().then(mac => {
      setMacAddress(mac);
    });
  }, [getMacAddress]);

  console.log('mac', macAddress);
  console.log('user_name', data.userName);
  console.log('mobile_no', data.phoneNumber);
  console.log('email_address', data.email);
  console.log('password', data.confirmPassword);

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
                  onPress={() => navigation.replace('SignInScreen')}
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
          REGISTRATION
        </Text>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 0.86,
          padding: 20,
          backgroundColor: 'white',
        }}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flex: 1}}>
          <View style={{flex: 2, marginTop: 20}}>
            <FormInput
              onChangeText={value => nameInputChange(value)}
              placeholderText="User Name"
              iconType="user"
              check_InputChange={data.check_textInputChange}
            />
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  username must be 4 characters long.
                </Text>
              </Animatable.View>
            )}
            <FormInput
              onChangeText={value => phoneNumberInputChange(value)}
              placeholderText="Mobile No."
              iconType="smartphone"
              check_InputChange={data.check_phoneInputChange}
            />
            {data.isValidPhone ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Phone Number should be 11 digit.
                </Text>
              </Animatable.View>
            )}

            <FormInput
              onChangeText={value => emailInputChange(value)}
              placeholderText="Email Id"
              iconType="mail"
              check_InputChange={data.check_emailInputChange}
            />
            {data.isValidEmail ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Enter email address properly.
                </Text>
              </Animatable.View>
            )}
            <FormPasswordInput
              onChangeText={value => handlePasswordChange(value)}
              placeholderText="Password"
              iconType="lock"
              updateSecureTextEntry={updateSecureTextEntry}
              secureTextEntry={data.secureTextEntry ? true : false}
              check_InputChange={data.check_passwordInputChange}
            />
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 character long.
                </Text>
              </Animatable.View>
            )}
            <FormPasswordInput
              onChangeText={value => handleConfirmPasswordChange(value)}
              placeholderText="Confirm Password"
              iconType="lock"
              updateSecureTextEntry={updateSecureTextEntry}
              secureTextEntry={data.secureTextEntry ? true : false}
              check_InputChange={data.check_passwordConfirmInputChange}
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
                if (
                  data.email !== '' &&
                  data.phoneNumber !== '' &&
                  data.userName !== '' &&
                  data.confirmPassword !== '' &&
                  data.password !== ''
                ) {
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
                      navigation.navigate('OtpScreen', {
                        user_name: data.userName,
                        mobile_no: data.phoneNumber,
                        email_address: data.email,
                        password: data.confirmPassword,
                        mac_address: macAddress,
                      });
                    } else {
                      changeSubscribeModalVisibility(true);
                      setAlertData({
                        headText: 'Error!',
                        bodyText:
                          'Please check your Internet connection. Or retry.',
                        signOut: false,
                      });
                    }
                  });
                } else {
                  changeSubscribeModalVisibility(true);
                  setAlertData({
                    headText: 'Invalid Entry.',
                    bodyText: 'Please fill all the input field properly.',
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
        }}>
        <Text style={{color: 'white', fontSize: 18}}></Text>
      </View>
    </Animated.View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.86,
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
    marginTop: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
