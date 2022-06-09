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
import {AuthContext} from '../context';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Compliance.db'});

const ModalPicker = props => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.modal,
          {width: windowWidth - 40, height: windowHeight / 2.3, opacity: 1},
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 10,
            backgroundColor: '#FF0000',
            borderRadius: 10,
          }}>
          <View style={{flex: 0.7, margin: 10}}>
            <Text
              style={{
                fontSize: 22,
                color: 'yellow',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Login Failed !
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'left',
                margin: 10,
                marginTop: 20,
                fontWeight: 'bold',
              }}>
              * Ensure you are using the Same Device, which used during
              Registration.
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'left',
                margin: 10,
                marginTop: 5,
                fontWeight: 'bold',
              }}>
              * Type your LOGIN 'Email' and 'Password' correctly. Both are Case
              Sensitive.
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'left',
                margin: 10,
                marginTop: 5,
                fontWeight: 'bold',
              }}>
              * Check your device Security Options.
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
                margin: 20,
              }}></View>
            <View
              style={{
                flex: 1,
                margin: 10,
              }}></View>
            <View style={{flex: 1, margin: 10}}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: windowWidth / 5,
                  backgroundColor: '#2E86C1',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  if (props.alertData.signOut) {
                    props.changeModalVisibility(false), signOut();
                    db.transaction(function (tx) {
                      tx.executeSql('DELETE FROM users');
                    });
                    props.navigation.navigate('Home');
                  } else if (props.alertData.navigate) {
                    props.changeModalVisibility(false);
                    props.navigation.goBack();
                  } else {
                    props.changeModalVisibility(false);
                  }
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  OK
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
