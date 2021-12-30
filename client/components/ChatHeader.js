import React from 'react';
import { selectChannelName } from '../features/appSlice';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
  const headerName = useSelector(selectChannelName);
 
  return (
    <header className='chatHeader'>
      <section className='chatHeader__left'>
        <h3>
          <span className='chatHeader__hash'>#</span>
          {headerName}
        </h3>
      </section>
    </header>
  )
}
export default ChatHeader;