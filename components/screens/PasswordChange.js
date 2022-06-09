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

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

import {AuthContext} from '../context';

const SignUpScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [dbUser, setDBUser] = useState(null);
  const [data, setData] = useState({
    oldPassword: '',
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

  const handleOldPasswordChange = value => {
    if (value) {
      setData({
        ...data,
        oldPassword: value,
      });
    } else {
      setData({
        ...data,
        password: '',
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

  console.log('oldpass', data.oldPassword);
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
          PASSWORD CHANGE
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
          <View
            style={{
              flex: 3,

              marginTop: 100,
            }}>
            <FormPasswordInput
              onChangeText={value => handleOldPasswordChange(value)}
              placeholderText="Old Password"
              iconType="lock"
              updateSecureTextEntry={updateSecureTextEntry}
              secureTextEntry={data.secureTextEntry ? true : false}
            />

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
              placeholderText="Confirm New Password"
              iconType="lock"
              updateSecureTextEntry={updateSecureTextEntry}
              secureTextEntry={data.secureTextEntry ? true : false}
              check_InputChange={data.check_passwordConfirmInputChange}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
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
                if (data.oldPassword !== '') {
                  fetch('https://admin.icg.com.bd/api/customer/oldpasscheck', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                    body: JSON.stringify({
                      email_address: email,
                      password: data.oldPassword,
                    }),
                  }).then(response => {
                    const getStatus = response.status;

                    if (getStatus === 200) {
                      fetch('https://admin.icg.com.bd/api/resetpassword', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Accept: 'application/json',
                        },
                        body: JSON.stringify({
                          email_address: email,
                          password: data.confirmPassword,
                        }),
                      }).then(response => {
                        const getStatus = response.status;

                        if (getStatus === 200) {
                          changeSubscribeModalVisibility(true);
                          setAlertData({
                            headText: 'Password changed.',
                            bodyText:
                              'Your new password has created. You will redirect to login page. Login and enjoy the App.',
                            signOut: true,
                          });
                        } else {
                          changeSubscribeModalVisibility(true);
                          setAlertData({
                            headText: 'Password change failed.',
                            bodyText:
                              'Due to internet or server error password change fail. Please try again. Thank you.',
                            signOut: false,
                          });
                        }
                      });
                    } else {
                      changeSubscribeModalVisibility(true);
                      setAlertData({
                        headText: 'Incorrect old password.',
                        bodyText: 'Please enter your old password properly.',
                        signOut: false,
                      });
                    }
                  });
                } else {
                  changeSubscribeModalVisibility(true);
                  setAlertData({
                    headText: 'Please Enter all the field properly.',
                    bodyText:
                      'You are seeing this alert because your input field is empty or check internet connection.',
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
