import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Appbar} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;

  useEffect(() => {
    const docid =
      uid > auth().currentUser.uid
        ? auth().currentUser.uid + '-' + uid
        : uid + '-' + auth().currentUser.uid;
    const messageRef = firestore()
      .collection('chatstore')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSnap => {
        const data = docSnap.data();
        if (data.createdAt) {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSnap.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });
  }, []);

  const onSend = messagesArray => {
    const msg = messagesArray[0];
    const mymsg = {
      ...msg,
      sentBy: auth().currentUser.uid,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docid =
      uid > auth().currentUser.uid
        ? auth().currentUser.uid + '-' + uid
        : uid + '-' + auth().currentUser.uid;

    firestore()
      .collection('chatstore')
      .doc(docid)
      .collection('messages')
      .add(mymsg);
  };

  return (
    <React.Fragment>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={route.params.name} />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth().currentUser.uid,
        }}
      />
    </React.Fragment>
  );
};

export default ChatScreen;
