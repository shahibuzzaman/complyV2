import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import DrawerContent from './components/screens/DrawerContent';
import RootStackScreen from './components/screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HomeStackScreen,
  DetailsStackScreen,
  ProfileStackScreen,
} from './components/screens/MainScreen';

import {AuthContext} from './components/context';
import SplashScreen from './components/screens/SplashScreen';
import GlobalState from './components/context/GlobalState';
import {CartProvider} from './components/context/favourite-context';
import linking from './components/utils/linking';
import SplashToHome from './components/screens/SplashToHome';
import SignInAlertModal from './components/utils/SignInAlertModal';

const Drawer = createDrawerNavigator();

const App = () => {
  const [alertData, setAlertData] = useState({
    headText: '',
    bodyText: '',
    signOut: false,
  });

  const [isSubscribeModalVisible, setIsSubscribeModalVisible] = useState(false);

  const changeSubscribeModalVisibility = bool => {
    setIsSubscribeModalVisible(bool);
  };

  const initialLoginState = {
    isLoading: true,
    email_address: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email_address: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email_address: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (email_address, password, macAddress) => {
        if (email_address && password) {
          try {
            // userToken = 'abcd';
            // await AsyncStorage.setItem('userToken', userToken);
            let userToken;
            userToken = null;
            await fetch('https://admin.icg.com.bd/api/auth/customer/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                email_address: email_address,
                password: password,
                mac_address: macAddress,
              }),
            }).then(response => {
              const getStatus = response.status;
              // console.log(getStatus);
              if (getStatus === 200) {
                response
                  .json()
                  .then(async result => {
                    // console.log('token', result.access_token);
                    dispatch({
                      type: 'LOGIN',
                      id: email_address,
                      token: result.access_token,
                    });
                    await AsyncStorage.setItem(
                      'userToken',
                      JSON.stringify({
                        getToken: result.access_token,
                      }),
                    );
                  })
                  .catch(error => {
                    console.error(error);
                  });
              } else {
                changeSubscribeModalVisibility(true);
                // setAlertData({
                //   headText: 'Login failed.',
                //   bodyText:
                //     'Invalid email or password. Please Enter email or password correctly.',
                //   signOut: false,
                // });
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(async () => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 5000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1}}>
        <StatusBar animated={true} backgroundColor="#006400" />
        <SplashToHome />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <CartProvider>
        <NavigationContainer linking={linking}>
          <StatusBar animated={true} backgroundColor="#006400" />
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={props => (
                <DrawerContent {...props} useFocusEffect={useFocusEffect} />
              )}>
              <Drawer.Screen name="Home" component={HomeStackScreen} />
              <Drawer.Screen name="Details" component={DetailsStackScreen} />
              <Drawer.Screen name="Profile" component={ProfileStackScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </CartProvider>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSubscribeModalVisible}
        nRequestClose={() => changeSubscribeModalVisibility(false)}>
        <SignInAlertModal
          changeModalVisibility={changeSubscribeModalVisibility}
          alertData={alertData}
        />
      </Modal>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
