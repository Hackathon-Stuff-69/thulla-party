import { User } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCpm0oz--wfGxXW8_t91UsCw5t51kkhKBs',
  authDomain: 'thulla-party.firebaseapp.com',
  projectId: 'thulla-party',
  storageBucket: 'thulla-party.appspot.com',
  messagingSenderId: '276975202499',
  appId: '1:276975202499:web:7d8ab89d0e70a32ac1b276',
  measurementId: 'G-KJZF459F9Y',
};

const DAILY_API_KEY = '';
export const DAILY_API_HEADERS = { headers: { Authorization: `Bearer ${DAILY_API_KEY}` } };

export type RoomItem = {
  name?: string;
  url?: string;
};

export type MainState = {
  user: User | null;
  rooms: Array<RoomItem>;
};
