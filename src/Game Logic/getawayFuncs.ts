import * as basicFuncs from './basicFuncs';
import { DeckData, DrawnCards, GameStatus, RoomItem } from '../constants';
import { addRoom, addData, getRoomById } from '../Services/coreService';
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

// init game. get deck info, total players and assign cards to them

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startGame = async (roomName) => {
  await addData(roomName, GameStatus.started);
  const room: any = await getRoomById(roomName);
  const is_dealt = await dealHands(room);
  if (is_dealt) {
    console.log('Game Started :', is_dealt);
  } else {
    console.log('Dealing Status: ', is_dealt);
  }

  console.log('Room', room);
};

const dealHands = async (room: RoomItem) => {
  try {
    const deckData: DeckData = room.deck_data;
    let remaining: number = deckData.remaining;
    const no_of_players = room.players.length;
    if (room.game_status == GameStatus.started) {
      const cards_per_player = Math.floor(52 / no_of_players);
      for (let i = 0; i < no_of_players; i++) {
        let player = room.players[i];
        player = player.replace(/ +/g, '');

        const cardsDrawn: any = await basicFuncs.drawCards(deckData.deck_id, cards_per_player);
        if (cardsDrawn.result.success) {
          const pile = await basicFuncs.addToPiles(deckData.deck_id, player, cardsDrawn.result.cards);
          console.log('Pile', pile);
          remaining = cardsDrawn.result.remaining;
        }
      }

      // in case the deck still has some cards remaining
      if (remaining > 0) {
        let i = 0;
        do {
          let player = room.players[i];
          player = player.replace(/ +/g, '');
          const cardsDrawn: any = await basicFuncs.drawCards(deckData.deck_id, 1); // draw 1 card per loop
          if (cardsDrawn.result.success) {
            const pile = await basicFuncs.addToPiles(deckData.deck_id, player, cardsDrawn.result.cards);
            console.log('Pile', pile);
            remaining = cardsDrawn.result.remaining;
          }
          i++;
        } while (remaining > 0);
      }

      return true;
    }
  } catch (error) {
    console.error(error.error);
    return false;
  }
};

export { initializeRoom, startGame, dealHands };
