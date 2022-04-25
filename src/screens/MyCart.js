import React from 'react';
import {View, FlatList, TouchableHighlight, Alert, Text} from 'react-native';
import {Appbar, Button, Card, Paragraph} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';

const MyCart = ({navigation}) => {
  const items = useSelector(state => state.cartReducer.selecteditems.items);
  console.log(items);

  const dispatch = useDispatch();
  const selectitem = item => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item,
    });
  };

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

          <Card.Actions>
            <Button
              onPress={() =>
                navigation.navigate('ChatScreen', {uid: item.uid})
              }>
              Contact Doner
            </Button>
            <Button onPress={() => selectitem(item)}>Remove from cart</Button>
          </Card.Actions>
        </Card>
      </TouchableHighlight>
    );
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="My Cart" />
      </Appbar.Header>
      {items != 0 ? (
        <View style={{marginBottom: 195}}>
          <FlatList
            data={items}
            keyExtractor={items.name}
            renderItem={({item}) => renderItem(item)}
          />
          <Button mode="contained" onPress={() => console.log('pressed')}>
            place order
          </Button>
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text>No items in cart</Text>
        </View>
      )}
    </View>
  );
};

export default MyCart;
