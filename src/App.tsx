import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  Auth,
  signOut,
} from 'firebase/auth';
import axios from 'axios';

import Home from './components/Home';
import Room from './components/Room';
import { DAILY_API_HEADERS, MainState, RoomItem, app } from './constants';

// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//, drawFromPile, listPiles, drawNoFromPile

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// console.log(app);
// const analytics = getAnalytics(app);

const App: React.FC = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [state, setState] = useState<MainState>({ user: null, rooms: [] });

  const googleSignIn = (auth: Auth, provider: GoogleAuthProvider) =>
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider).then((result) =>
          setState((prevState) => ({ ...prevState, user: result.user })),
        );
      })
      .catch((error) => {
        console.error(error);
      });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setState((prevState) => ({ ...prevState, user }));
    });

    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    if (state.user)
      axios
        .get('https://api.daily.co/v1/rooms', DAILY_API_HEADERS)
        .then((response) => setState((prevState) => ({ ...prevState, rooms: response.data.data })))
        .catch((error) => console.error(error));
  }, [state.user]);

  return (
    <Router>
      <nav className='flex items-center justify-between flex-wrap bg-green-500 p-6 border-0 border-solid border-b border-white'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <Link to='/'>
            <span className='font-semibold text-xl tracking-tight'>Thulla Party</span>
          </Link>
        </div>
        {state.user ? (
          <span className='flex items-center text-white space-x-4'>
            <img alt='Placeholder' className='block rounded-full w-8 h-8' src={state.user.photoURL} />
            <p className='m-0 font-bold'>{state.user.displayName}</p>
            <button className='m-0 px-2 rounded border border-solid border-white' onClick={() => signOut(auth)}>
              Logout
            </button>
          </span>
        ) : (
          <button className='text-white' onClick={() => googleSignIn(auth, provider)}>
            Login with Google
          </button>
        )}
      </nav>

      <Switch>
        <Route path='/room/:roomName'>
          <Room user={state.user} />
        </Route>
        <Route path='/'>
          <Home
            state={state}
            setState={(room: RoomItem) =>
              setState((prevState) => ({ ...prevState, rooms: [...prevState.rooms, room] }))
            }
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
