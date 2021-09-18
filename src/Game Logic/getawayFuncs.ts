import * as basicFuncs from './basicFuncs';
import { RoomItem } from '../constants';
import { addRoom, addData } from '../Services/coreService';
import { User } from 'firebase/auth';

const initializeRoom = async (roomData: RoomItem, userId: string) => {
  const deckData: any = await basicFuncs.shuffleCards();

  const docRef = await addRoom({
    ...roomData,
    deck_data: deckData.result,
    players: [],
    host: userId,
    game_status: 'initialized',
  });

  return docRef;
};

// const addUserToRoom = async (user: User, ) => {
//     members
// }

const startGame = async (roomName) => {
  await addData(roomName, { game_status: 'started' });
};

export { initializeRoom, startGame };
