import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import { collection, getDocs } from "firebase/firestore";

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

import { initializeRoom } from '../Game Logic/getawayFuncs';
import Header from './Header';
import { DAILY_API_HEADERS, MainState, RoomItem } from './../constants';

type HomeState = {
  show: boolean;
  roomName: string;
  error: string;
};

const Home = ({ state, setState }: { state: MainState; setState: (room: RoomItem) => void }) => {
  const [homeState, setHomeState] = useState<HomeState>({ show: false, roomName: '', error: null });

  const createRoom = () => {
    if (homeState.roomName)
      axios
        .post(
          'https://api.daily.co/v1/rooms',
          JSON.stringify({ name: homeState.roomName, properties: { enable_chat: true } }),
          DAILY_API_HEADERS,
        )
        .then((response: any) => {
          initializeRoom(response.data, state.user.uid).then((res) => console.log('firebase add result: ', res));
          console.log(response.data);
          setState(response.data);
        })
        .catch((error) => {
          console.error(error);
          setHomeState((prevState) => ({ ...prevState, error: 'Error creating room' }));
        });
  };

  return (
    <>
      <Header user={state.user} />
      <div
        className='flex flex-col justify-center space-y-6 w-screen h-screen'
        style={{
          background: `url('static/cover.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
        }}
      >
        {state.user ? (
          <>
            <form className='flex flex-col transition duration-500 ease-in-out bg-black border-2 border-gray-300 font-bold text-white bg-opacity-20 hover:bg-white hover:bg-opacity-90 hover:text-black items-center justify-center mx-auto mt-6 w-64 p-4 rounded shadow-lg space-y-2'>
              {homeState.error && <p className='m-0 text-red-500 text-center'>{homeState.error}</p>}
              <input
                className={`${
                  homeState.error ? 'border border-solid border-red-500' : ''
                } bg-transparent opacity-80 focus:outline-none p-2 rounded`}
                placeholder='Enter Room Name'
                onChange={(e) => setHomeState((prevState) => ({ ...prevState, roomName: e.target.value }))}
                required
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setHomeState((prevState) => ({ ...prevState, error: null }));
                  createRoom();
                }}
                type='submit'
              >
                Add Room
              </button>
            </form>

            <div className='flex mx-auto max-w-5xl'>
              <div className='flex flex-wrap justify-center'>
                {state.rooms.map((room) => (
                  <Link className='p-4' key={room.name} to={`/room/${room.name}`}>
                    <div
                      id='tcard'
                      className='flex items-center transition duration-500 ease-in-out bg-black border-2 border-gray-300 font-bold text-white bg-opacity-20 hover:bg-white hover:bg-opacity-90 hover:text-black justify-center w-64 h-64 rounded-lg shadow-lg'
                    >
                      {room.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center transition duration-500 ease-in-out bg-black border-2 border-gray-300 font-bold text-white bg-opacity-20 hover:bg-white hover:bg-opacity-90 hover:text-black mx-auto w-64 p-4 rounded shadow-lg'>
            Login to Boriat Bhagao
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
