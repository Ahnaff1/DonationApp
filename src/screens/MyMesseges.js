import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, View, TouchableHighlight} from 'react-native';
import {ActivityIndicator, Colors, Appbar} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MyMesseges = ({navigation}) => {
  const [users, setUsers] = useState();

  const getUsers = async () => {
    const querySnap = await firestore()
      .collection('users')
      .where('uid', '!=', auth().currentUser.uid)
      .get();
    const allusers = querySnap.docs.map(docSnap => docSnap.data());
    setUsers(allusers);
  };
  useEffect(() => {
    getUsers();
    return;
  }, []);

  if (!users) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={Colors.blue900} />
      </View>
    );
  }

  const RenderCard = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('ChatScreen', {name: item.name, uid: item.uid})
        }>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              flexDirection: 'row',
              elevation: 10,
              height: 80,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 50, width: 50, borderRadius: 25, marginLeft: 15}}
              source={{uri: item.image}}
            />
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, paddingLeft: 15, fontWeight: '700'}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 16, paddingLeft: 15}}>{item.email}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="My Messeges" />
      </Appbar.Header>
      <FlatList
        data={users}
        renderItem={({item}) => <RenderCard item={item} />}
        keyExtractor={item => item.uid}
      />
    </View>
  );
};

export default MyMesseges;
