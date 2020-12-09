import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser, login, logout } from './features/userSlice';
import Login from './component/Login';
import Main from './component/Main';
import { auth } from './firebase/firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  return (
    <>
      {
        user ? <Main /> : <Login />
      }
    </>
  );
}

export default App;
