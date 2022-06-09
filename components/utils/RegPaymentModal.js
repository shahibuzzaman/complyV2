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

import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});
import {AuthContext} from '../context';

import {windowWidth, windowHeight} from './Dimensions';

const ModalPicker = props => {
  const onNavigationStateChange = webViewState => {
    console.log(webViewState.url);
  };

  useEffect(() => {
    setTimeout(() => {
      props.changeModalVisibility(false);
    }, 30000);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.modal,
          {width: windowWidth - 10, height: windowHeight / 1.3, opacity: 1},
        ]}>
        <View
          style={{
            flex: 0.1,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 100,
              backgroundColor: '#FF0000',
              padding: 1,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}
            onPress={() => props.changeModalVisibility(false)}>
            <Icon name="x" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, margin: 10}}>
          <WebView
            onNavigationStateChange={onNavigationStateChange}
            source={{uri: `https://admin.icg.com.bd/payment/${props.reg_id}`}}
          />
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
    backgroundColor: '#006400',
    borderRadius: 10,
    marginTop: 30,
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
