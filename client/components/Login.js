import { Button } from '@mui/material';
import { auth, provider } from '../../firebase';
import React from 'react';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider)
    .catch(err => alert(err.message));
  };

  return (
    <div className='login'>
      <h2> I am the login page</h2>
     
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;