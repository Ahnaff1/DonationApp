import React, {useEffect, useState} from 'react';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DonateScreen from './screens/DonateScreen';
import HomeNavigation from './navigators/HomeNavigation';
import AccountNavigation from './navigators/AccountNavigation';

import Feather from 'react-native-vector-icons/Feather';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import auth from '@react-native-firebase/auth';

// import {Provider} from 'react-redux';
// import configureStore from '../redux/reducers/';

// const store = configureStore();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigation"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'HomeNavigation') {
            iconName = 'home';
          } else if (route.name === 'Donate') {
            iconName = 'plus-circle';
          } else {
            iconName = 'user';
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser('');
      }
    });
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return <Navigation />;
};

export default App;
