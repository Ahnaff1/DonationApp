import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyMesseges from '../screens/MyMesseges';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();
const MessageNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="MessageScreen">
      <Stack.Screen
        name="MessageScreen"
        component={MyMesseges}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MessageNavigation;
