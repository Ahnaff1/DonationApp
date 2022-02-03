import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput, Button, ActivityIndicator, Colors} from 'react-native-paper';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.blue900} />;
  }

  const ImageUpload = () => {
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

  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      Alert.alert('Please fill all the fields');
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      firestore().collection('users').add({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        image: image,
      });
      setLoading(false);
    } catch {
      Alert.alert('Something went wrong cheack your email and password ');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.main}>Equalify</Text>
      </View>

      <View style={{margin: 10, justifyContent: 'space-evenly', height: 300}}>
        <TextInput
          style={{elevation: 10, borderRadius: 10}}
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={{elevation: 10, borderRadius: 10}}
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={{elevation: 10, borderRadius: 10}}
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button icon="camera" mode="contained" onPress={() => ImageUpload()}>
          Select Profile Pic
        </Button>
        <Button
          disabled={image ? false : true}
          mode="contained"
          onPress={() => userSignup()}>
          Signup
        </Button>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    fontSize: 55,
    fontWeight: 'bold',
  },
});
