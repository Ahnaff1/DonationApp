import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const DonateScreen = () => {
  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const [location, setlocation] = useState('');
  const [image, setImage] = useState('');

  const postData = async () => {
    try {
      await firestore().collection('items').add({
        name,
        discription,
        location,
        image,
        uid: auth().currentUser.uid,
      });
      Alert.alert('Updated your donation');
    } catch (err) {
      Alert.alert('something went wrong');
    }
  };

  const openCamera = () => {
    launchCamera({quality: 0.5}, fileobj => {
      const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) alert('image uploaded');
        },
        error => {
          alert('something went wrong');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImage(downloadURL);
          });
        },
      );
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Donate on Equalify
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          justifyContent: 'space-evenly',
          height: 400,
        }}>
        <TextInput
          style={{elevation: 10, borderRadius: 10}}
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={{elevation: 10, borderRadius: 10}}
          label="Discription"
          mode="outlined"
          numberOfLines={3}
          multiline
          value={discription}
          onChangeText={text => setDiscription(text)}
        />
        <TextInput
          style={{elevation: 10, borderRadius: 10}}
          label="Address"
          mode="outlined"
          value={location}
          onChangeText={text => setlocation(text)}
        />

        <Button icon="camera" mode="contained" onPress={() => openCamera()}>
          Upload Image
        </Button>
        <Button
          disabled={image ? false : true}
          mode="contained"
          onPress={() => postData()}>
          Donate
        </Button>
      </View>
    </View>
  );
};

export default DonateScreen;
