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

const SignUpScreen = ({navigation, route}) => {
  const {email_address} = route.params;
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
    check_passwordInputChange: false,
    check_passwordConfirmInputChange: false,
    secureTextEntry: true,
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
          PASSWORD RESET
        </Text>
      </View>
      <View
        style={{
          flex: 0.86,
          alignItems: 'center',
          padding: 20,
          backgroundColor: 'white',
        }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          style={styles.containerAvoidingView}
          behavior="height">
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                margin: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Enter your new password.
            </Text>
            <FormPasswordInput
              onChangeText={value => handlePasswordChange(value)}
              placeholderText="New Password"
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
          <View style={{flex: 1, alignItems: 'center'}}>
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
                if (data.password !== '' && data.confirmPassword !== '') {
                  fetch('https://admin.icg.com.bd/api/resetpassword', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                    body: JSON.stringify({
                      email_address: email_address,
                      password: data.confirmPassword,
                    }),
                  }).then(response => {
                    const getStatus = response.status;

                    if (getStatus === 200) {
                      console.log(response.status);
                      navigation.navigate('PassResetSuccess');
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
                    headText: 'Requirement missing.',
                    bodyText:
                      'Please fill the New Password and Confirm Password field properly.',
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
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
