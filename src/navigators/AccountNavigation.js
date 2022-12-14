import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccountScreen from '../screens/AccountScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import MessageNavigation from './MessageNavigation';
import MyCart from '../screens/MyCart';
import MyOrdersScreen from '../screens/MyOrdersScreen';

const Stack = createNativeStackNavigator();
const AccountNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyDonationScreen"
        component={MyDonationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyMesseges"
        component={MessageNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCart"
        component={MyCart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
