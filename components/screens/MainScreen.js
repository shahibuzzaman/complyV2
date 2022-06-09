import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ProfileScreen from './ProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ChapterScreen from './ChapterScreen';
import ArticleScreen from './ArticleScreen';
import SearchArticleScreen from './SearchArticleScreen';
import SearchResultScreen from './SearchResult';
import SubscriptionScreen from './TrialSubscriptionScreen';
import SplashToHome from './SplashToHome';
import SubsSuccessfulScreen from './LoggedInSubsSuccess';
import PasswordChange from './PasswordChange';
import HowToUse from './HowToUse';
import Faq from './Faq';
import Announcement from './Announcement';
import Feedback from './Feedback';
import ChangeProfilePicture from './ChangeProfilePicture';
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

export const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* <HomeStack.Screen
        name="Splash"
        component={SplashToHome}
        options={{
          title: '',
          headerShown: false,
        }}
      /> */}
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerShown: false,
          // title: 'Home Screen',
          // headerLeft: () => (
          //   <Icon.Button
          //     name="ios-menu"
          //     size={25}
          //     backgroundColor="#009387"
          //     onPress={() => navigation.openDrawer()}></Icon.Button>
          // ),
        }}
      />
      <HomeStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SubsSuccessfulScreen"
        component={SubsSuccessfulScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="LawChapter"
        component={ChapterScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SearchArticle"
        component={SearchArticleScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export const DetailsStackScreen = ({navigation}) => {
  return (
    <DetailsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <DetailsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </DetailsStack.Navigator>
  );
};

export const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Change Password"
        component={PasswordChange}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="How to use"
        component={HowToUse}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="FAQ"
        component={Faq}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Announcement"
        component={Announcement}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Change Profile Picture"
        component={ChangeProfilePicture}
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};
