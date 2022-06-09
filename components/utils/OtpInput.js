import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OtpInput = props => {
  const {setInternalVal, internalVal} = props;
  let textInput = useRef();
  const lengthInput = 6;
  const onChangeText = val => {
    setInternalVal(val);
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  console.log(internalVal);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'height'}
        style={styles.containerAvoidingView}>
        <TextInput
          ref={input => (textInput = input)}
          onChangeText={onChangeText}
          value={internalVal}
          maxLength={lengthInput}
          returnKeyType="done"
          keyboardType="numeric"
          style={{width: 0, height: 0}}
        />
        <TouchableOpacity
          style={styles.containerInput}
          onPress={() => textInput.focus()}>
          {Array(lengthInput)
            .fill()
            .map((data, index) => (
              <View
                key={index}
                style={[
                  styles.cellView,
                  {
                    borderBottomColor:
                      index === internalVal.length ? '#FB6C6A' : '#234DB7',
                  },
                ]}>
                <Text style={styles.cellText}>
                  {internalVal && internalVal.length > 0
                    ? internalVal[index]
                    : ''}
                </Text>
              </View>
            ))}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default OtpInput;
