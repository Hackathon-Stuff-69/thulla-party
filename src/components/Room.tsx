import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { doc, onSnapshot } from 'firebase/firestore';

import Thulla from './Games/Thulla';
import { addPlayer } from '../Services/coreService';
import { DAILY_API_HEADERS, RoomItem, db, UserType } from './../constants';
import { startGame, startGameNonHost, updateTurn } from '../Game Logic/getawayFuncs';
import { addToPiles, drawFromPile, listPiles } from '../Game Logic/basicFuncs';
import { getDeckId } from '../Game Logic/getawayFuncs';
import Header from './Header';

const deleteRoom = (roomName: string, history) =>
  axios.delete(`https://api.daily.co/v1/rooms/${roomName}`, DAILY_API_HEADERS).finally(() => history.push('/'));

type State = {
  room?: RoomItem;
  canStart: boolean;
  hasStarted: boolean;
  isHost: boolean;
  deckId: string;
  turn?: number;
};

const Room = ({ user }: UserType) => {
  const [state, setState] = useState<State>({
    room: null,
    canStart: false,
    hasStarted: false,
    isHost: false,
    deckId: null,
    turn: null,
  });
  const [tableCards, setTableCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const callWrapperRef = useRef(null);
  const specs = useRef([]);
  const callFrame = useRef<DailyCall>();
  const { roomName } = useParams<{ roomName: string }>();
  const history = useHistory();
  const playerRef = useRef<[]>([]);

  useEffect(() => {
    getDeckId(roomName).then((deckId) => setState((prevState) => ({ ...prevState, deckId })));
  }, []);

  useEffect(() => {
    if (user)
      axios
        .get(`https://api.daily.co/v1/rooms/${roomName}`, DAILY_API_HEADERS)
        .then((response) => {
          addPlayer(roomName, user.displayName);
          setState((prevState) => ({ ...prevState, room: response.data }));
        })
        .catch(() => history.push('/'));
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (state?.room?.name && callWrapperRef.current) {
      callFrame.current = DailyIframe.createFrame(callWrapperRef.current);
      const callFrameTemp = callFrame.current;
      callFrameTemp.on('left-meeting', handleLeaveMeeting).on('joined-meeting', handleJoinedMeeting);

      try {
        callFrameTemp.join({
          url: state.room.url,
          showLeaveButton: true,
        });
      } catch (e) {
        console.error(e);
      }
    }
    // eslint-disable-next-line
  }, [state?.room?.name]);

  // eslint-disable-next-line
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'rooms', roomName), (doc) => {
      if (doc.data().host === user?.uid && !state.isHost) setState((prevState) => ({ ...prevState, isHost: true }));
      if (doc.data().players.length >= 3 && doc.data().host === user?.uid && !state.canStart) {
        setState((prevState) => ({ ...prevState, canStart: true }));
      } else if (doc.data().players.length < 3 && state.canStart) {
        setState((prevState) => ({ ...prevState, canStart: false }));
      }

      //update host status from backend
      if (doc.data()?.game_status === 'started' && state.hasStarted === false && doc.data()?.host !== user.uid) {
        setState((prevState) => ({ ...prevState, hasStarted: true, turn: doc.data()?.turn }));
        playerRef.current = doc.data()?.players;
        getTableCards().then((res: any) => {
          const tableCards = res?.result?.piles?.['tablePile']?.cards || [];
          setSpecs(tableCards);
          setTableCards(tableCards);
        });
      }

      //game state update from backend
      if (doc.data()?.game_status === 'started' && state.hasStarted === false) {
        // game start for players other than host
        if (doc.data()?.host !== user.uid) startGameNonHost(roomName, user.displayName);
        setState((prevState) => ({ ...prevState, hasStarted: true, turn: doc.data()?.turn }));
        playerRef.current = doc.data()?.players;
        getTableCards().then((res: any) => {
          const tableCards = res?.result?.piles?.['tablePile']?.cards || [];
          setSpecs(tableCards);
          setTableCards(tableCards);
        });
      }
    });

    return unsub;
  }, [user]);

  useEffect(() => {
    if (state.hasStarted) {
      getPlayerCards().then((res: any) => {
        console.log(res);
        setPlayerCards(res?.result?.piles?.[user?.displayName.replace(' ', '')].cards);
      });

      getTableCards().then((res: any) => {
        const tableCards = res?.result?.piles?.['tablePile']?.cards || [];
        console.log('tableCards', tableCards);
        setSpecs(tableCards);
        setTableCards(tableCards);
      });
    }
  }, [state.hasStarted]);

  const setSpecs = (tableCards) => {
    const specsArray = [];
    for (let i = 0; i < tableCards.length; i++) {
      specsArray.push({
        marginTop: Math.floor(Math.random() * 230),
        marginLeft: Math.floor(Math.random() * 230),
        marginRight: Math.floor(Math.random() * 230),
        transform: Math.floor(Math.random() * 360),
      });
    }
    specs.current = specsArray;
    console.log('specs.current', specs.current);
  };

  const getPlayerCards = async () => {
    const deckId = await getDeckId(roomName);
    return await listPiles(deckId, user?.displayName.replace(' ', ''));
  };

  const getTableCards = async () => {
    const deckId = await getDeckId(roomName);
    return await listPiles(deckId, 'tablePile');
  };

  const startHandler = () => {
    startGame(roomName, user.displayName).then(() => {
      getPlayerCards().then((res: any) => {
        console.log(res);
        setPlayerCards(res?.result?.piles?.[user?.displayName.replace(' ', '')].cards);
      });

      getTableCards().then((res: any) => {
        const tableCards = res?.result?.piles?.['tablePile']?.cards || [];
        setSpecs(tableCards);
        setTableCards(tableCards);
      });
    });
    setState((prevState) => ({ ...prevState, hasStarted: true }));
  };

  const transferCard = (cardToDraw) => {
    drawFromPile(state.deckId, user?.displayName.replace(' ', ''), [cardToDraw]).then(() => {
      addToPiles(state.deckId, 'tablePile', [cardToDraw]).then(() => {
        updateTurn(roomName, playerRef.current.length || 0, state.turn);
        setPlayerCards((prevState) => prevState.filter((card) => card.code !== cardToDraw.code));
        specs.current = [
          ...specs.current,
          {
            marginTop: Math.floor(Math.random() * 230),
            marginLeft: Math.floor(Math.random() * 230),
            marginRight: Math.floor(Math.random() * 230),
            transform: Math.floor(Math.random() * 360),
          },
        ];
        setTableCards((prevState) => [...prevState, cardToDraw]);
      });
    });
  };

  const handleJoinedMeeting = () => {
    // write logic to add the person in waiting list if game is already being played
  };

  const handleLeaveMeeting = () => {
    if (!callFrame.current?.participants.length) deleteRoom(roomName, history);
  };

  return (
    <>
      <Header user={user} />
      <div className='flex h-screen w-screen relative'>
        {state.isHost && (
          <button
            className='flex absolute right-0 z-10 rounded mt-6 mr-6 text-sm p-2 transition duration-500 ease-in-out bg-black border-2 border-gray-300 font-bold text-white bg-opacity-20 hover:bg-white hover:bg-opacity-90 hover:text-black'
            onClick={() => deleteRoom(roomName, history)}
          >
            Delete Room
          </button>
        )}
        {state.room?.name ? (
          <>
            <div ref={callWrapperRef} className='w-1/4' />
            {state.hasStarted ? (
              <Thulla
                playerCards={playerCards}
                tableCards={tableCards}
                transferCard={transferCard}
                specs={specs.current}
              />
            ) : (
              <div className='flex items-center justify-center w-3/4'>
                {state.canStart ? (
                  <button onClick={startHandler}>Start Game!</button>
                ) : (
                  <p>Waiting for people to join...</p>
                )}
              </div>
            )}
          </>
        ) : (
          <div className='flex items-center justify-center w-full text-3xl'>Loading Room...</div>
        )}
      </div>
    </>
  );
};

export default Room;
