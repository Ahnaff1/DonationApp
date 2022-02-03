import React from 'react';
import {Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';

const Myorder = ({navigation}) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="My Orders" />
      </Appbar.Header>
      <Text>orders</Text>
    </View>
  );
};

export default Myorder;
