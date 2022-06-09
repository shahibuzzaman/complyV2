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
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.modal,
          {width: windowWidth - 50, height: windowHeight / 3.5, opacity: 1},
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
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Invalid email or password!
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, margin: 10}}></View>
            <View style={{flex: 1, margin: 10}}>
              <Button
                title="Ok"
                onPress={() => props.changeModalVisibility(false)}
              />
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
