import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { doc, onSnapshot } from 'firebase/firestore';

import Thulla from './Games/Thulla';
import { addPlayer } from '../Services/coreService';
import { DAILY_API_HEADERS, RoomItem, db, UserType } from './../constants';
import { startGame } from '../Game Logic/getawayFuncs';
import Header from './Header';

const deleteRoom = (roomName: string, history) =>
  axios.delete(`https://api.daily.co/v1/rooms/${roomName}`, DAILY_API_HEADERS).finally(() => history.push('/'));

type State = {
  room?: RoomItem;
  canStart: boolean;
  hasStarted: boolean;
  isHost: boolean;
};

const Room = ({ user }: UserType) => {
  const [state, setState] = useState<State>({ room: null, canStart: false, hasStarted: true, isHost: false });
  const callWrapperRef = useRef(null);
  const callFrame = useRef<DailyCall>();
  const { roomName } = useParams<{ roomName: string }>();
  const history = useHistory();

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
      if (doc.data().status === 'started') setState((prevState) => ({ ...prevState, hasStarted: true }));
    });

    return unsub;
  }, [user]);

  const startHandler = () => {
    startGame(roomName);
    setState((prevState) => ({ ...prevState, hasStarted: true }));
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
              <Thulla />
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
