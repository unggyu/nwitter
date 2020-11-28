import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  console.log(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializeing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
