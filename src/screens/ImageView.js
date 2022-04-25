import React from 'react';
import {View, Image} from 'react-native';
import {Appbar} from 'react-native-paper';

const ImageView = ({route, navigation}) => {
  const {image} = route.params;
  return (
    <React.Fragment>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Image" />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: 300,
            backgroundColor: 'black',
            justifyContent: 'center',
          }}>
          <Image
            style={{height: 250, width: '100%'}}
            resizeMode="contain"
            source={{uri: image}}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default ImageView;
