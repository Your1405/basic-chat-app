import './App.css';
import Chat from './Chat.js';
import Logo from './Logo';

import { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [ username, setUsername ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ showChat, setShowChat ] = useState(false);

  const leaveRoom = () => {
    socket.emit('leave_room', room);
    setShowChat(false);
  }

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit('join_room', room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {
        !showChat ? 
        (<div className='room-picker'>
          <Logo />
          <input 
            className='input margin-top-medium'
            type="text" 
            placeholder="Username..." 
            onChange={(event)=> {
              setUsername(event.target.value);
            }}/>
          <input 
            className='input'
            type="text" 
            placeholder="Room Name..."
            onChange={(event)=>{
              setRoom(event.target.value);
            }} />
          <button onClick={joinRoom} className="join-btn">Join Room</button>
        </div>)
        :
        (<Chat socket={socket} username={username} room={room} disconnectHandler={leaveRoom}/>)
      }
    </div>
  );
}

export default App;
