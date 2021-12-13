// маршрутизация
import { useLocation } from 'react-router-dom';
// хуки
import { useChat } from '../hooks/useChat';
// import { useLocalStorage } from '../hooks/useLocalStorage';
// import { useSessionStorage } from '../hooks/useSessionStorage';
// компоненты
import Messenger from './ChatRoom/Messenger';
import UserList from './ChatRoom/UserList';


function ChatRoom() {
    // const [roomId] = useSessionStorage('roomId', '');
    // const [username] = useSessionStorage('username', '');
    /* альтернатива для получения значений не через хранилище сессии */
    const location = useLocation();
    const username = location.state.username;
    const roomId = location.state.roomId;
    const { users, messages, sendMessage, removeMessage } = useChat(roomId);

    const TEMP_URL = 'localhost:3000/';

    return (
        <div className='row'>
            <div className='col-12 my-2'>
                <h2>Room: {roomId}</h2>
                <p>Copy and share this link to invite your friends: <b>{`${TEMP_URL}?roomId=${roomId}`}</b></p>
            </div>
            <div className='col-md-9 order-2'>
                <Messenger 
                messages={messages} 
                removeMessage={removeMessage} 
                username={username} 
                sendMessage={sendMessage}
                roomId={roomId}
                />
            </div>
            <div className='col-md-3 order-1'>
                <UserList users={users} />
            </div>
        </div>
    );
}

export default ChatRoom;