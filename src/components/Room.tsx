import { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import { User } from 'firebase/auth';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';

import { DAILY_API_HEADERS, RoomItem } from './../constants';

type State = {
  isScreenSharing: boolean;
  room?: RoomItem;
};

// https://boriat-bhagao.daily.co/7NtCkTxsgu3EhEgX3VgC

const Room = ({ user }: { user: User | null }) => {
  const [state, setState] = useState<State>({
    isScreenSharing: false,
    // room: { name: 'yolo', url: 'https://boriat-bhagao.daily.co/7NtCkTxsgu3EhEgX3VgC' },
  });
  const callWrapperRef = useRef(null);
  const callFrame = useRef<DailyCall>();
  const { roomName } = useParams<{ roomName: string }>();

  useEffect(() => {
    if (user)
      axios
        .get(`https://api.daily.co/v1/rooms/${roomName}`, DAILY_API_HEADERS)
        .then((response) => setState((prevState) => ({ ...prevState, room: response.data.data })))
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

  // const toggleCamera = () => {
  //   if (callFrame.current) callFrame.current.setLocalVideo(!callFrame.current.participants().local.video);
  // };

  // const toggleMic = () => {
  //   if (callFrame.current) callFrame.current.setLocalAudio(!callFrame.current.participants().local.audio);
  // };

  // const toggleScreenShare = () => {
  //   if (callFrame.current) {
  //     const callFrameTemp = callFrame.current;
  //     const participants = callFrameTemp.participants();
  //     if (participants.local) {
  //       if (!participants.local.screen) callFrameTemp.startScreenShare();
  //       else if (participants.local.screen) callFrameTemp.stopScreenShare();

  //       setState((prevState) => ({ ...prevState, isScreenSharing: !prevState.isScreenSharing }));
  //     }
  //   }
  // };

  return (
    <div className='flex h-screen w-screen'>
      {state.room?.name ? (
        <>
          <div ref={callWrapperRef} className='w-1/4' />
          <div className='flex items-center justify-center w-3/4'>Render Game</div>
          {/* <div id='call-controls-wrapper' className='call-controls-wrapper hide'>
            <div className='call-controls'>
              <div className='controls-header'>
                <h3>Call overview</h3>
                <p id='demo-countdown' className='demo-countdown'></p>
              </div>
              <div className='controls-custom-example'>
                <div className='custom-buttons'>
                  <button onClick={toggleCamera} className='button controls-button white-button'>
                    Toggle camera
                    <img src='/assets/camera_icon.png' className='control-icon' alt='Drawing of a camera' />
                  </button>
                  <button onClick={toggleMic} className='button controls-button white-button'>
                    Toggle mic
                    <img src='/assets/mic_icon.png' className='control-icon' alt='Drawing of a microphone' />
                  </button>
                  <button onClick={toggleScreenShare} className='button controls-button white-button'>
                    {state.isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
                    <img src='/assets/screenshare_icon.png' className='control-icon' alt='Drawing of computer screen' />
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </>
      ) : (
        <div className='flex items-center justify-center w-full'>Loading Room</div>
      )}
    </div>
  );
};

export default Room;
