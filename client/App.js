import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import '../stylesheets/styles.scss';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from '../firebase';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
          );
      } else {
        //the user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className='app'>
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
