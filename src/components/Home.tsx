import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import axios from 'axios';

import { DAILY_API_HEADERS, MainState, RoomItem } from './../constants';

const Home = ({ state, setState }: { state: MainState; setState: (room: RoomItem) => void }) => {
  const createRoom = () => {
    axios
      .post('https://api.daily.co/v1/rooms', JSON.stringify({ properties: { enable_chat: true } }), DAILY_API_HEADERS)
      .then((response) => setState(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {state.user && (
        <div className='flex flex-col'>
          <button onClick={createRoom}>Create Room</button>
        </div>
      )}
      <div className='flex'>
        {state.rooms.map((room) => (
          <Link key={room.name} to={`/room/${room.name}`}>
            <div className='flex items-center justify-center w-64 h-64'>{room.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
