import React, {useEffect, useState} from 'react';
import {Text, FlatList, TouchableHighlight, View} from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  Searchbar,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// import {useDispatch} from 'react-redux';

const HomeScreen = ({navigation}) => {
  // const dispatch = useDispatch();
  // const selectitem = item =>
  //   dispatch({
  //     type: 'ADD_TO_CART',
  //     payload: item,
  //   });
  const [items, setitems] = useState('');
  const [filterItems, setFilterItems] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchFilter = text => {
    if (text) {
      const newData = items.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterItems(newData);
      setSearchQuery(text);
    } else {
      setFilterItems(items);
      setSearchQuery(text);
    }
  };

  const getitems = async () => {
    const querySnap = await firestore().collection('items').get();
    const result = querySnap.docs.map(docSnap => docSnap.data());
    setitems(result);
    setFilterItems(result);
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
      <TouchableHighlight
        onPress={() => navigation.navigate('ImageView', {image: item.image})}>
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
          {item.uid != auth().currentUser.uid ? (
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.navigate('ChatScreen', {uid: item.uid})
                }>
                Contact Doner
              </Button>
            </Card.Actions>
          ) : null}
        </Card>
      </TouchableHighlight>
    );
  };

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
        Equalify
      </Text>
      <View style={{width: '95%', borderRadius: 10, elevation: 10}}>
        <Searchbar
          placeholder="Search"
          onChangeText={text => searchFilter(text)}
          value={searchQuery}
        />
      </View>
      <View style={{width: '99%', marginTop: 5, marginBottom: 90}}>
        <FlatList
          data={filterItems}
          keyExtractor={(item, index) => index.toString()}
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
