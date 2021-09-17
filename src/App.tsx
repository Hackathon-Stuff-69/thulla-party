import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCpm0oz--wfGxXW8_t91UsCw5t51kkhKBs',
  authDomain: 'thulla-party.firebaseapp.com',
  projectId: 'thulla-party',
  storageBucket: 'thulla-party.appspot.com',
  messagingSenderId: '276975202499',
  appId: '1:276975202499:web:7d8ab89d0e70a32ac1b276',
  measurementId: 'G-KJZF459F9Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

console.log(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

const googleSignIn = (auth: Auth, provider: GoogleAuthProvider) =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorMessage);
    });

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav className='flex items-center justify-between flex-wrap bg-green-500 p-6'>
          <div className='flex items-center flex-shrink-0 text-white mr-6'>
            <span className='font-semibold text-xl tracking-tight'>Thulla Party</span>
          </div>
          <button onClick={() => googleSignIn(auth, provider)}>Login Google</button>
        </nav>

        <Switch>
          {/* <Route exact path='/todos'>
            <Todos />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
