import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';

const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
