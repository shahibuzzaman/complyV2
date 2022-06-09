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
  const {signOut} = React.useContext(AuthContext);
  const onNavigationStateChange = webViewState => {
    console.log(webViewState.url);
  };
  const [getItem, setItem] = useState('');
  const [token, setToken] = useState('');

  const TokenValue = async () => {
    try {
      let value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        setToken(JSON.parse(value));
      }
    } catch (e) {}
  };

  useEffect(() => {
    TokenValue();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('https://admin.icg.com.bd/api/auth/customer/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'bearer ' + token.getToken,
        },
      }).then(response => {
        response.json().then(userData => {
          setItem(userData);
        });
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [token]);

  function paymentHandler() {
    signOut();
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM users');
    });
  }

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
            onPress={() =>
              getItem && getItem.registration_date !== null
                ? paymentHandler()
                : props.changeModalVisibility(false)
            }>
            <Icon name="x" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, margin: 10}}>
          {getItem && getItem.registration_date !== null ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Congratulations!
              </Text>
              <Text
                style={{
                  fontSize: 18,

                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Your payment is Successful. {'\n'} Close this modal and you will
                redirect to login page. Login and enjoy the app.
              </Text>
            </View>
          ) : (
            <WebView
              onNavigationStateChange={onNavigationStateChange}
              source={{uri: `https://admin.icg.com.bd/payment/${props.reg_id}`}}
            />
          )}
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
