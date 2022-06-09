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
import RegPaymentModal from '../utils/RegPaymentModal';
import {Header} from 'react-native-elements';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SubscriptionScreen = ({navigation, route}) => {
  const {reg_id} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
  };
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
          SUBSCRIPTION
        </Text>
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          To access, explore and read Full Contents of All Laws, pay Annual
          Subscription Fee {'\n'}
          <Text style={{color: 'blue'}}>BDT 500</Text> only.
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40,
          }}>
          To make Payment click <Text style={{color: 'blue'}}>"Continue"</Text>{' '}
          Otherwise click <Text style={{color: 'blue'}}>"Cancel"</Text> to EXIT.
        </Text>
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
          onPress={() => changeModalVisibility(true)}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 18}}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('SignInScreen')}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 18}}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}>
        <RegPaymentModal
          changeModalVisibility={changeModalVisibility}
          navigation={navigation}
          reg_id={reg_id}
        />
      </Modal>
    </Animated.View>
  );
};

export default SubscriptionScreen;

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
