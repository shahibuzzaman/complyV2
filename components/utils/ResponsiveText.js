import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ResponsiveText = (fontSize, text, style, numberOfLines) => {
  const [currentFont, setCurrentFont] = useState(18);
  return (
    <Text
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit
      style={[style, {fontSize: currentFont}]}
      onTextLayout={e => {
        const {lines} = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 4);
        }
      }}>
      ABCD hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    </Text>
  );
};

export default ResponsiveText;

const styles = StyleSheet.create({});
