import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from './features/userSlice';
import Login from './component/Login';
import Main from './component/Main';

function App() {
  const user = useSelector(selectUser);
  return (
    <>
      {
        user ? <Main /> : <Login />
      }
    </>
  );
}

export default App;
