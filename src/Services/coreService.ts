// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { firebaseConfig, RoomItem } from '../constants';
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const addRoom = async (room: RoomItem) => {
  try {
    const docRef = await addDoc(collection(db, 'rooms'), {
      name: room.name,
      url: room.url,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export { addRoom };
