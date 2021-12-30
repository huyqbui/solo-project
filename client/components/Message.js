import { Avatar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Message = ({ user, message, timestamp }) => {
  const firstName = user.displayName.split(' ')[0];
  return (
    <div className='message'>
      <Avatar src={user.photo} />
      <section className='message__info'>
        <h4>
          {firstName}
          <span className='message__timestamp'>
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h4>
        <p>{message} </p>
      </section>
    </div>
  );
};

export default Message;
