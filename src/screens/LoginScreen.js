import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {TextInput, Button, ActivityIndicator, Colors} from 'react-native-paper';

import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={Colors.blue900} />
      </View>
    );
  }

  const userLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert('Please fill all the fields');
      return;
    }
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
    } catch {
      Alert.alert('Email and password does not match');
      return;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 55, color: 'black', fontWeight: 'bold'}}>
          Equalify
        </Text>
      </View>

      <View style={{margin: 10, justifyContent: 'space-evenly', height: 300}}>
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
        <Button mode="contained" onPress={() => userLogin()}>
          Login
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{paddingLeft: 5, fontSize: 20, color: 'black'}}>
            Don't have account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {},
});
