// Initialize Cloud Firestore through Firebase
import { addDoc, updateDoc, arrayUnion, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, RoomItem } from '../constants';
// const firebaseApp = initializeApp(firebaseConfig);

// const db = getFirestore();

// await setDoc(doc(citiesRef, "SF"), {
//   name: "San Francisco", state: "CA", country: "USA",
//   capital: false, population: 860000,
//   regions: ["west_coast", "norcal"] });

const addRoom = async (room: RoomItem) => {
  try {
    const docRef: any = await setDoc(doc(db, 'rooms', room.name), {
      ...room,
    });

    console.log('Add room successfull!!!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const addPlayer = async (roomName: string, playerName: any) => {
  try {
    const docRef = doc(db, 'rooms', roomName);
    await updateDoc(docRef, {
      players: arrayUnion(playerName),
    });

    console.log('Document written with ID: ', docRef.id);

    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getRoomById = async (roomName: string) => {
  try {
    const docRef: any = await doc(db, 'rooms', roomName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
    return docSnap.data();
  } catch (error) {
    console.error(error.error.message);
  }
};

const addData = async (roomName: string, status: string) => {
  try {
    const docRef: any = await doc(db, 'rooms', roomName);
    await setDoc(
      docRef,
      {
        game_status: status,
      },
      { merge: true },
    );
    return docRef;
    console.log('Update Successful!!!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export { addRoom, addPlayer, addData, getRoomById };
