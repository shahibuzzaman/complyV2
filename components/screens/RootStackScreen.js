import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import AcknowledgementScreen from './AckScreen';
import SignUpScreen from './SignUpScreen';
import OtpScreen from './OtpScreen';
import PaymentScreen from './PaymentScreen';
import SubscriptionScreen from './SubscriptionScreen';
import SubsSuccessfulScreen from './SubsSuccessfulScreen';
import PassResetScreen from './PassResetScreen';
import PassResetOtpScreen from './PassResetOtpScreen';
import NewPasswordScreen from './NewPasswordScreen';
import PassResetSuccessScreen from './PassResetSuccessScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="PassResetScreen" component={PassResetScreen} />
    <RootStack.Screen
      name="PassResetOtpScreen"
      component={PassResetOtpScreen}
    />
    <RootStack.Screen name="NewPassword" component={NewPasswordScreen} />
    <RootStack.Screen
      name="PassResetSuccess"
      component={PassResetSuccessScreen}
    />
    <RootStack.Screen name="AckScreen" component={AcknowledgementScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="OtpScreen" component={OtpScreen} />
    <RootStack.Screen name="PaymentScreen" component={PaymentScreen} />
    <RootStack.Screen name="SubsScreen" component={SubscriptionScreen} />
    <RootStack.Screen
      name="SubsSuccessfulScreen"
      component={SubsSuccessfulScreen}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
