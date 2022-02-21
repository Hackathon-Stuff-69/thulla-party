import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Room from './components/Room';
import { auth, DAILY_API_HEADERS, MainState, RoomItem } from './constants';

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
  const [state, setState] = useState<MainState>({ user: null, rooms: [] });

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
      <Switch>
        <Route exact path='/room/:roomName'>
          <Room user={state.user} />
        </Route>
        <Route exact path='/'>
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
