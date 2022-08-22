import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Chat.css';

function Chat({socket, username, room, disconnectHandler}) {
    const [ currentMessage, setCurrentMessage ] = useState("");
    const [ messageList, setMessageList ] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== ""){
            let currTime = new Date(Date.now()).getHours() + ":" + String(new Date(Date.now()).getMinutes()).padStart(2, "0");
            const messageData = {
                room: room,
                author: username,
                content: currentMessage,
                time: currTime
            };

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(()=> {
        socket.on('recieve_message', (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return(
        <div className='chat-container'>
            <div className="chat-header">
                <button onClick={disconnectHandler}>Leave Room</button>
                <h1>{room}</h1>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    { messageList.map((message) => {
                        return(
                            <div className='message' id={username === message.author ? "you" : "other"}>
                                <div className='message-content'>
                                    <p>{message.content}</p>
                                </div>
                                <div className='message-meta'>
                                    <p>{message.time}</p>
                                    <p>{message.author}</p>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type='text' value={currentMessage} onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}
                placeholder="Type a message..." 
                />
                <button 
                    onClick={sendMessage} 
                    onKeyPress={(event) => {
                        event.key === "enter" && sendMessage();
                    }}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

export default Chat;