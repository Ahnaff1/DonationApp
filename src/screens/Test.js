import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Appbar, IconButton} from 'react-native-paper';
import {Icon} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import CardforTest from './Component/CardforTest';

function Test(props) {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 45,
          backgroundColor: 'yellow',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <IconButton icon={'home'} color="black" />
        <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
          DATING APP
        </Text>
      </View>

      <View
        style={{
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CardforTest />
        <CardforTest />
        <CardforTest />
        <CardforTest />
        <CardforTest />
        <CardforTest />
        <CardforTest />
        <CardforTest />
      </View>
    </View>
  );
}

export default Test;
