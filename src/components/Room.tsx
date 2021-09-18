import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { User } from 'firebase/auth';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { doc, onSnapshot } from 'firebase/firestore';

import Thulla from './Games/Thulla';
import { addPlayer } from '../Services/coreService';
import { DAILY_API_HEADERS, RoomItem, db, UserType } from './../constants';
import { startGame, startGameNonHost } from '../Game Logic/getawayFuncs';
import Header from './Header';

type State = {
  room?: RoomItem;
  canStart: boolean;
  hasStarted: boolean;
};

const Room = ({ user }: UserType) => {
  const [state, setState] = useState<State>({ room: null, canStart: false, hasStarted: false });
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
      if (doc.data()?.players.length >= 3 && doc.data().host === user?.uid && !state.canStart) {
        setState((prevState) => ({ ...prevState, canStart: true }));
      } else if (doc.data().players.length < 3 && state.canStart) {
        setState((prevState) => ({ ...prevState, canStart: false }));
      }

      // game state update for players other than host
      if (doc.data().game_status === 'started' && state.hasStarted === false) {
        startGameNonHost(roomName, user.displayName);
        setState((prevState) => ({ ...prevState, hasStarted: true }));
      }
    });

    return unsub;
  }, [user]);

  const startHandler = () => {
    startGame(roomName, user.displayName);
    setState((prevState) => ({ ...prevState, hasStarted: true }));
  };

  const handleJoinedMeeting = () => {
    // write logic to add the person in waiting list if game is already being played
  };

  const handleLeaveMeeting = () => {
    if (!callFrame.current?.participants.length)
      axios
        .delete(`https://api.daily.co/v1/rooms/${roomName}`, DAILY_API_HEADERS)
        .then(() => history.push('/'))
        .catch(() => history.push('/'));
  };

  return (
    <>
      <Header user={user} />
      <div className='flex h-screen w-screen'>
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
