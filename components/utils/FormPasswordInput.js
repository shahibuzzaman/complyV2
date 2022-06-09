import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from './Dimensions';
import * as Animatable from 'react-native-animatable';

import Feather from 'react-native-vector-icons/Feather';

const FormPasswordInput = ({
  labelValue,
  placeholderText,
  iconType,
  secureTextEntry,
  updateSecureTextEntry,
  check_InputChange,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Feather name={iconType} size={22} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      {check_InputChange ? (
        <Animatable.View animation="bounceIn" style={{marginRight: 10}}>
          <Feather name="check-circle" color="green" size={20} />
        </Animatable.View>
      ) : null}
      <TouchableOpacity
        onPress={updateSecureTextEntry}
        style={{marginRight: 10}}>
        {secureTextEntry ? (
          <Feather name="eye-off" color="grey" size={20} />
        ) : (
          <Feather name="eye" color="grey" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FormPasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainerErr: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: windowHeight / 15,
    borderColor: 'red',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
