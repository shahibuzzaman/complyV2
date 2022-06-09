import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {windowWidth, windowHeight} from './Dimensions';

const ModalPicker = props => {
  console.log('777', props.user_id);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.modal,
          {width: windowWidth - 10, height: windowHeight / 2, opacity: 1},
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 10,
            backgroundColor: '#FF0000',
            borderRadius: 10,
          }}>
          <View style={{flex: 0.8}}>
            <Text
              style={{
                fontSize: 22,
                color: 'yellow',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
              }}>
              You are using 7 days Free Trial.
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
                marginTop: 20,
              }}>
              After 7 days App will be Non-Functional.
            </Text>
            <Image
              style={{
                width: windowWidth - 32,
                height: windowWidth / 2.6,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
              resizeMode="cover"
              source={require('../assets/Ad.png')}
            />
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
                marginTop: -20,
                marginHorizontal: 20,
              }}>
              To use the App, Pay Taka 500 {'\n'} for Life Time Subscription.
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                margin: 10,
              }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: windowWidth / 2 - 40,
                  backgroundColor: '#2E86C1',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  props.changeModalVisibility(false),
                    props.navigation.navigate('Subscription', {
                      user_id: props.user_id,
                    });
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  PAY
                </Text>
              </TouchableOpacity>
              {/* <Button
                fontWeight="bold"
                title="Subscribe"
                onPress={() => {
                  props.changeModalVisibility(false),
                    props.navigation.navigate('Subscription', {
                      user_id: props.user_id,
                    });
                }}
              /> */}
            </View>
            <View style={{flex: 1, margin: 10}}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: windowWidth / 2 - 40,
                  backgroundColor: '#2E86C1',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => props.changeModalVisibility(false)}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  USE TRIAL
                </Text>
              </TouchableOpacity>
              {/* <Button
                title="use trial"
                onPress={() => props.changeModalVisibility(false)}
              /> */}
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
