import { Button } from '@mui/material';
import React from 'react';
import { auth } from '../../firebase';
import { selectsettings } from '../features/settingsSlice';
import { useSelector } from 'react-redux';

const SettingsPopup = () => {
  const settings = useSelector(selectsettings);
  return (
    <div className='settingsPopup'>
      {settings.active ? (
        <div className='settingsPopup__inner'>
          <Button
            className='signoutBtn'
            onClick={() => {
              auth.signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className='settingsPopup__inner'></div>
      )}
    </div>
  );
};

export default SettingsPopup;
