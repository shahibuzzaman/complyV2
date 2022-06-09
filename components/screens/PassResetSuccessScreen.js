import React, {useEffect} from 'react';
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

const AcknowledgementScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignInScreen');
    }, 5000);
  }, []);

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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Congratulations! {'\n'}{' '}
            <Text style={{fontSize: 16, fontWeight: 'normal'}}>
              Your Password reset is Successful.
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'normal',
              textAlign: 'center',
              marginTop: 20,
            }}>
            You will automatically redirect to the login page. Enjoy the App.
          </Text>
        </View>
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
