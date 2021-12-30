import { ExpandMore } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';

import React, { useEffect, useState } from 'react';
import SidebarChannel from './SidebarChannel';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import SettingsPopup from './SettingsPopup';
import { selectsettings, toggle } from '../features/settingsSlice';
import { useDispatch } from 'react-redux';
import db from '../../firebase';

const Sidebar = ({ onClick }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const settings = useSelector(selectsettings);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels').onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  });

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');

    if (channelName) {
      db.collection('channels').add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className='container'>
      <header className='container__top'>
        <h3>Your Rooms</h3>
        <ExpandMore />
      </header>

      <section className='sidebar__channels'>
        <header className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMore />
            <h4>Text Channels</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className='sidebar__addChannel' />
        </header>

        <div className='sidebar__channelsList'>
          {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} id={id} name={channel.channelName} />
          ))}
        </div>
      </section>

      <section className='sidebar__profile'>
        <Avatar src={user.photo} />
        <header className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </header>
        <div className='sidebar__profileIcons'>
          <SettingsIcon
            onClick={() => {
              dispatch(
                toggle({
                  active: !settings.active,
                })
              );
            }}
          />
        </div>
      </section>
      <SettingsPopup />
    </div>
  );
};

export default Sidebar;
