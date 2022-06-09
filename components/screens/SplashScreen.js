import React, {useState, useEffect} from 'react';
import {View, Text, Image, Animated} from 'react-native';

const SplashScreen = ({navigation}) => {
  const opacity = useState(new Animated.Value(0))[0];

  function textFadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    textFadeIn();
  }, []);

  setTimeout(() => {
    navigation.replace('SignInScreen');
  }, 3000);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 3,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        <Image
          style={{height: 200, width: 100, flex: 1, resizeMode: 'cover'}}
          source={require('../assets/Logo.png')}
        />
        {/* <Animated.Text
          style={{
            opacity,
            fontSize: 24,
            marginTop: 10,
            fontWeight: 'bold',
            color: 'green',
          }}>
          Compliance Laws (BD)
        </Animated.Text> */}
      </View>
      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#0000CD',
          }}>
          Brought to You {'\n'} By
        </Text>
        <View
          style={{
            flex: 0.4,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,

              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              style={{
                height: '80%',
                width: '30%',
              }}
              resizeMode="contain"
              source={require('../assets/icg.png')}
            />
          </View>
          <View
            style={{
              flex: 1.5,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FF0000',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'left',
                marginTop: 10,
              }}>
              ICG.COM.BD
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
