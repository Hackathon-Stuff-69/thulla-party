import * as basicFuncs from './basicFuncs';
import { RoomItem } from '../constants';
import { addRoom } from '../Services/coreService';
import { User } from 'firebase/auth';

const initializeRoom = async (roomData: RoomItem) => {
  const deckData: any = await basicFuncs.shuffleCards();

  const docRef = await addRoom({ ...roomData, deck_data: deckData.result, players: [] });

  return docRef;
};

// const addUserToRoom = async (user: User, ) => {
//     members
// }

export { initializeRoom };
