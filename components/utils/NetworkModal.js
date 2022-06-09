import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {windowWidth, windowHeight} from './Dimensions';

const ModalPicker = props => {
  console.log('777', props.user_id);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.modal,
          {width: windowWidth - 10, height: windowHeight / 2.5, opacity: 1},
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 10,
            backgroundColor: '#FF0000',
            borderRadius: 10,
          }}>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: 22,
                color: 'yellow',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
              }}>
              SORRY ! {'\n'}
              You are Not Connected to the Internet.
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                margin: 20,
              }}>
              for smooth experiences, please Connect to the Internet.
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  width: 65,
                  height: 65,
                  borderRadius: 100,
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#fff',
                  shadowOffset: {
                    width: 12,
                    height: 12,
                  },
                  shadowOpacity: 3,
                  shadowRadius: 10,

                  elevation: -20,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#006400',
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#fff',
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,

                    elevation: 24,
                  }}
                  onPress={() => {
                    props.changeModalVisibility(false);
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FF0000',
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modal: {
    backgroundColor: 'green',
    borderRadius: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  option: {
    alignItems: 'flex-start',
  },
  text: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
