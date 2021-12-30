import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { selectChannelName, selectChannelId } from '../features/appSlice';
import { useSelector } from 'react-redux';
import db from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { selectUser } from '../features/userSlice';

const Chat = () => {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  // const scrollToBottom = () => {
  //   scrollIntoView({ behavior: 'smooth' });
  // }
  
  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
        // scrollToBottom();
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('channels').doc(channelId).collection('messages').add({
      user: user,
      message: textInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTextInput('');
  };

  return (
    <div className='chat'>
      <ChatHeader />

      <section className='chat__messages'>
        {messages.map((message) => (
          <Message
            key={message.timestamp}
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
      </section>

      <section className='chat__input'>
        <form>
          <input
            disabled={!channelId}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            className='chat__inputButton'
            type='submit'
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div
          style={{ float: 'left', clear: 'both' }}
        ></div>
      </section>
    </div>
  );
};

export default Chat;
