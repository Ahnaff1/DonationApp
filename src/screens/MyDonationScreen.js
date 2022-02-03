import React, {useState, useEffect} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  ActivityIndicator,
  Colors,
  Appbar,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MyDonationScreen = ({navigation}) => {
  const [items, setitems] = useState('');
  const [loading, setLoading] = useState(false);

  const getitems = async () => {
    const querySnap = await firestore()
      .collection('items')
      .where('uid', '==', auth().currentUser.uid)
      .get();
    const result = querySnap.docs.map(docSnap => docSnap.data());
    console.log(result);
    setitems(result);
  };

  const deleteitem = async item => {
    try {
      await firestore().collection('items').doc(item).delete();
      Alert.alert('deleted your donation');
    } catch (err) {
      Alert.alert('something went wrong');
    }
  };

  useEffect(() => {
    getitems();
    return;
  }, []);

  if (!items) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={Colors.blue900} />
      </View>
    );
  }

  const renderItem = item => {
    return (
      <Card
        style={{
          margin: 5,
          elevation: 10,
          borderRadius: 15,
        }}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.discription}</Paragraph>
          <Paragraph>{item.location}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: item.image}} />
        <Card.Actions>
          <Button onPress={() => deleteitem(item)}>Delete donation</Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="My Donation" />
      </Appbar.Header>
      <View style={{width: '99%', marginBottom: 115}}>
        <FlatList
          data={items.reverse()}
          keyExtractor={item => item.image}
          renderItem={({item}) => renderItem(item)}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setLoading(true);
            getitems();
            setLoading(false);
          }}
          refreshing={loading}
        />
      </View>
    </View>
  );
};

export default MyDonationScreen;
