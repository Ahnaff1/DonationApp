import React from 'react';
import {View, Text, Image} from 'react-native';
import {IconButton} from 'react-native-paper';

function CardforTest(props) {
  return (
    <View
      style={{
        width: '47%',
        backgroundColor: 'red',
        height: '30%',
        margin: 5,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
      }}>
      <Image
        source={require('../../../assets/pic.jpg')}
        resizeMode="contain"
        style={{height: '100%', width: '100%'}}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 5,
        }}>
        <View>
          <Text style={{color: 'black'}}>Card</Text>
          <Text style={{color: 'black'}}>user Location</Text>
        </View>
        <IconButton icon={'camera'} />
      </View>
    </View>
  );
}

export default CardforTest;
