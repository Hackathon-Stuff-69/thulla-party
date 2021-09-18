import { firebase } from 'firebase/firebase-app';
import { collection, addDoc } from 'firebase/firestore';

import { RoomItem } from '../constants';
const db = firebase.firestore();

const addRoom = async (room: RoomItem) => {
  //   const roomRef = await addDoc(collection(db, 'rooms'), {
  //     name: room.name,
  //     url: room.url,
  //   });

  const roomRef = db.collection('rooms').add({
    name: room.name,
    url: room.url,
  });
};

export { addRoom };
