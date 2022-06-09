import React from 'react';
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
          ACKNOWLEDGEMENT
        </Text>
      </View>
      <View
        style={{
          flex: 0.86,
          padding: 20,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ScrollView style={{flex: 1}}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              textAlign: 'left',
            }}>
            This is an initiative for the "Admin , HR and Compliance and
            Auditing Professionals of Bangladesh" so that, they can access to
            consult the labour laws and other relevant laws at anytime anyplace
            in their Smart Phone or other supported Devices. The App will always
            have the LATEST update of laws whenever published.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              textAlign: 'left',
              marginTop: 20,
            }}>
            Every effort has been put to ensure the accuracy of the information
            in this App. Any inadvertent errors that may have crept in or for
            the outcomes that result from using this App is user's
            responsibility. This App is only intended for general knowledge and
            reference.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              textAlign: 'left',
              marginTop: 20,
            }}>
            This is a PAID App (Life Time subscription fee BDT 500) and by
            clicking on 'Agree' below, user is willingly ready to pay for
            continuing and exploring contents of this App. User also hereby
            acknowledging that, user has read and agreed to all the Terms &
            Conditions, Privacy Policy & Refund Policy as intended and mentioned
            on the website
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {' '}
              www.icg.com.bd
            </Text>
          </Text>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.08,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUpScreen')}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 18}}>Agree</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('SignInScreen')}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 18}}>Disagree</Text>
        </TouchableOpacity>
      </View>
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
