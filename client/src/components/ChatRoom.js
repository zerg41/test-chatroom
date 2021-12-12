import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// хуки
import { useChat } from '../hooks/useChat';
import { useLocalStorage } from '../hooks/useLocalStorage';
// компоненты
import Messenger from './ChatRoom/Messenger';
import UserList from './ChatRoom/UserList';


function ChatRoom() {
    const [roomId, setRoomId] = useLocalStorage('roomId', '');
    const [username] = useLocalStorage('username', '');
    const { users, messages, sendMessage, removeMessage } = useChat(roomId);

    /* проверка на наличие логина при входе в комнату по прямой ссылке */
    const history = useHistory();
    // вытаскиваем id комнаты из пути в браузере
    const params = useParams();
    // сохраняем в хранилище id комнаты и направялем на главную для ввода имени
    useEffect(() => {
        if (!username) {
            setRoomId(params.roomId);
            history.goBack();
        }
    },[]);

    return (
        <div className='row'>
            <div className='col-12 my-2'>
                <h2>Room: {roomId}</h2>
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