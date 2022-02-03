import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Button, List, Card, Title, Paragraph} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AccountScreen = ({navigation}) => {
  const [user, setUser] = useState('');

  const getuser = async () => {
    const querySnap = await firestore()
      .collection('users')
      .where('uid', '==', auth().currentUser.uid)
      .get();
    const result = querySnap.docs.map(docSnap => docSnap.data());
    setUser(result);
  };

  useEffect(() => {
    getuser();
    return;
  }, []);

  return (
    <View style={{alignItems: 'center', marginTop: 25}}>
      <View style={{width: '95%'}}>
        <Card style={{elevation: 10, borderRadius: 10}}>
          <Card.Content>
            <Title>{}</Title>
            <Paragraph>{auth().currentUser.email}</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View
        style={{
          width: '95%',
          height: 250,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyDonationScreen')}
          style={{elevation: 10, backgroundColor: 'white', borderRadius: 10}}>
          <List.Item
            title="My Donation"
            left={props => <List.Icon {...props} icon="folder" />}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyMesseges')}
          style={{elevation: 10, backgroundColor: 'white', borderRadius: 10}}>
          <List.Item
            title="My Messages"
            left={props => <List.Icon {...props} icon="message" />}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyOrders')}
          style={{elevation: 10, backgroundColor: 'white', borderRadius: 10}}>
          <List.Item
            title="My Orders"
            left={props => <List.Icon {...props} icon="mail" />}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '95%'}}>
        <Button mode="contained" onPress={() => auth().signOut()}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default AccountScreen;
