import * as basicFuncs from './basicFuncs';
import { RoomItem, db } from '../constants';
import { doc, getDoc } from 'firebase/firestore';
import { addRoom, addData } from '../Services/coreService';
import { User } from 'firebase/auth';

import { split } from '../utils/common';

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

const startGame = async (roomName, hostName) => {
  try {
    const roomsRef = doc(db, 'rooms', roomName);
    const docSnap = await getDoc(roomsRef);

    const docData = await docSnap.data();

    const deck_id = docData.deck_data.deck_id;

    const noOfPlayers = docData.players.length;

    const cardsToDraw = split(52, noOfPlayers);

    const hostDrawNo = cardsToDraw.pop();

    const hostDraw: any = await basicFuncs.drawCards(deck_id, hostDrawNo);

    const hostPile = await basicFuncs.addToPiles(deck_id, hostName.replace(' ', ''), hostDraw?.result.cards);

    await addData(roomName, { game_status: 'started', cards_to_draw: cardsToDraw });
  } catch (err) {
    console.log(err);
  }
};

const startGameNonHost = async (roomName, playerName) => {
  try {
    const roomsRef = doc(db, 'rooms', roomName);
    const docSnap = await getDoc(roomsRef);

    const docData = await docSnap.data();

    const deck_id = docData.deck_data.deck_id;

    const cardsToDraw = docData.cards_to_draw;

    const playerDrawNo = cardsToDraw.pop();

    const playerDraw: any = await basicFuncs.drawCards(deck_id, playerDrawNo);

    const playerPile = await basicFuncs.addToPiles(deck_id, playerName.replace(' ', ''), playerDraw?.result.cards);

    await addData(roomName, { game_status: 'started', cards_to_draw: cardsToDraw });
  } catch (err) {
    console.log(err);
  }
};

export { initializeRoom, startGame, startGameNonHost };
