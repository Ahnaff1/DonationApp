import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  Searchbar,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [items, setitems] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  const getitems = async () => {
    const querySnap = await firestore().collection('items').get();
    const result = querySnap.docs.map(docSnap => docSnap.data());
    setitems(result);
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
      <TouchableOpacity onPress={() => setModalVisible(true)}>
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
            <Button>Contact Doner</Button>
            <Button onPress={() => navigation.navigate('PlaceOrder')}>
              Place order
            </Button>
          </Card.Actions>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Equalify</Text>
      <View style={{width: '95%', borderRadius: 10, elevation: 10}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={{width: '99%', marginTop: 5, marginBottom: 90}}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}>
            <Image
              style={{height: 350, width: '95%', marginTop: 25}}
              resizeMode="contain"
              source={{
                uri: items.image,
              }}
            />
          </View>
        </Modal>
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

export default HomeScreen;
