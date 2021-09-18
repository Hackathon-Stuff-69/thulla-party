import { User } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyCpm0oz--wfGxXW8_t91UsCw5t51kkhKBs',
  authDomain: 'thulla-party.firebaseapp.com',
  projectId: 'thulla-party',
  storageBucket: 'thulla-party.appspot.com',
  messagingSenderId: '276975202499',
  appId: '1:276975202499:web:7d8ab89d0e70a32ac1b276',
  measurementId: 'G-KJZF459F9Y',
};

const DAILY_API_KEY = process.env.REACT_APP_DAILY_API_KEY;
export const DAILY_API_HEADERS = { headers: { Authorization: `Bearer ${DAILY_API_KEY}` } };

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export interface Players {
  name: string;
  playerId: number;
}

export type DeckData = {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
};

export type RoomItem = {
  name?: string;
  url?: string;
  deck_data?: DeckData;
  players?: string[];
};

export type MainState = {
  user: User | null;
  rooms: Array<RoomItem>;
};
