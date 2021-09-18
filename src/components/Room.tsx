import { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import Thulla from './Games/Thulla';
import { User } from 'firebase/auth';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { addPlayer } from '../Services/coreService';

import { DAILY_API_HEADERS, RoomItem, db } from './../constants';
import { startGame } from '../Game Logic/getawayFuncs';

import { doc, onSnapshot } from 'firebase/firestore';

type State = {
  room?: RoomItem;
  canStart: boolean;
  hasStarted: boolean;
};

const Room = ({ user }: { user: User | null }) => {
  const [state, setState] = useState<State>({ room: null, canStart: false, hasStarted: false });
  const callWrapperRef = useRef(null);
  const callFrame = useRef<DailyCall>();
  const { roomName } = useParams<{ roomName: string }>();

  useEffect(() => {
    if (user)
      axios
        .get(`https://api.daily.co/v1/rooms/${roomName}`, DAILY_API_HEADERS)
        .then((response) => {
          addPlayer(roomName, user.displayName);
          setState((prevState) => ({ ...prevState, room: response.data }));
        })
        .catch(() => <Redirect to='/' />);
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
    if (!callFrame.current?.participants.length)
      axios
        .delete(`https://api.daily.co/v1/rooms/${roomName}`, DAILY_API_HEADERS)
        .then(() => <Redirect to='/' />)
        .catch(() => <Redirect to='/' />);
  };

  return (
    <div className='flex h-screen w-screen'>
      {state.room?.name ? (
        <>
          <div ref={callWrapperRef} className='w-1/4' />
          <div className='flex items-center justify-center w-3/4'>
            {state.hasStarted ? (
              <Thulla />
            ) : state.canStart ? (
              <button onClick={startHandler}>Start Game!</button>
            ) : (
              <p>Waiting for people to join...</p>
            )}
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center w-full text-3xl'>Loading Room...</div>
      )}
    </div>
  );
};

export default Room;
