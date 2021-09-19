import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  Auth,
  signOut,
} from 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import { auth, provider, UserType } from './../constants';

const Header = ({ user }: UserType) => {
  const history = useHistory();

  const googleSignIn = (auth: Auth, provider: GoogleAuthProvider) =>
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider).then((result) => console.log(result));
      })
      .catch((error) => {
        console.error(error);
      });

  return (
    <nav className='flex items-center justify-between flex-wrap p-6 bg-primary'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <Link to='/'>
          <img src='static/logo.png' className='w-24 h-16' />
        </Link>
      </div>
      {user ? (
        <span className='flex items-center text-white space-x-4'>
          <img alt='Placeholder' className='block rounded-full w-8 h-8' src={user.photoURL} />
          <p className='m-0 font-bold'>{user.displayName}</p>
          <button
            className='m-0 bg-transparent hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded'
            onClick={() => {
              history.push('/');
              signOut(auth);
            }}
          >
            Logout
          </button>
        </span>
      ) : (
        <button
          className='bg-transparent hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded'
          onClick={() => googleSignIn(auth, provider)}
        >
          Login with Google
        </button>
      )}
    </nav>
  );
};

export default Header;
