import { Link } from 'react-router-dom';
import axios from 'axios';

// import { collection, getDocs } from "firebase/firestore";

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

import { initializeRoom } from '../Game Logic/getawayFuncs';

import { DAILY_API_HEADERS, MainState, RoomItem } from './../constants';

const dummyGenerator = async () => {
  return { data: { name: 'Test Daily Room Name', url: 'test.com' } };
};

const Home = ({ state, setState }: { state: MainState; setState: (room: RoomItem) => void }) => {
  const createRoom = () => {
    axios
      .post('https://api.daily.co/v1/rooms', JSON.stringify({ properties: { enable_chat: true } }), DAILY_API_HEADERS)
      // dummyGenerator()
      .then((response: any) => {
        initializeRoom(response.data, state.user.uid).then((res) => console.log('firebase add result: ', res));
        console.log(response.data);
        setState(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className='flex flex-col justify-center space-y-6 h-full w-screen'
      style={{
        background: `url('static/banner.png')`,
        backgroundSize: 'cover',
      }}
    >
      {state.user && (
        <>
          <button
            className='flex flex-col items-center justify-center mx-auto mt-6 w-64 h-24 bg-white rounded shadow-lg'
            onClick={createRoom}
          >
            Create Room
          </button>
          <div className='flex mx-auto max-w-5xl'>
            <div className='flex flex-wrap justify-center'>
              {state.rooms.map((room, index) => (
                <Link className='p-4' key={room.name} to={`/room/${room.name}`}>
                  <div className='flex items-center justify-center bg-white w-64 h-64 rounded-lg shadow-lg'>
                    Room {index + 1}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
