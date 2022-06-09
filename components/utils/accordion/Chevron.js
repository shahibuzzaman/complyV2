import React from 'react';
import {StyleSheet, processColor} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Animated from 'react-native-reanimated';
import {mix, mixColor} from 'react-native-redash/lib/module/v1';

const size = 25;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Chevron = ({transition}) => {
  const rotateZ = mix(transition, Math.PI, 0);
  return (
    <Animated.View style={[styles.container, {transform: [{rotateZ}]}]}>
      <Icon name="chevron-up" size={20} color="black" />
    </Animated.View>
  );
};

export default Chevron;
