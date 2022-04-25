import React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator, Colors, Appbar} from 'react-native-paper';

function MyOrdersScreen({navigation}) {
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="My Orders" />
      </Appbar.Header>
      <Text style={{color: 'black'}}>Screen not ready yet</Text>
    </View>
  );
}

export default MyOrdersScreen;
