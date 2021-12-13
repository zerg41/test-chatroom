import { nanoid } from 'nanoid';
// маршрутизация
import { useHistory, useLocation } from 'react-router-dom';
// хуки
// import { useLocalStorage } from '../hooks/useLocalStorage'; --заменил на хранение в рамках сессии
import { useSessionStorage } from '../hooks/useSessionStorage';
// стили
import { Form, Button, FormGroup, Label } from 'reactstrap';
import { useEffect } from 'react';


function Home() {
    // локальное состояние для имени пользователя
    const [username, setUsername] = useSessionStorage('username', '');
    // локальное состояние для комнаты
    const [roomId, setRoomId] = useSessionStorage('roomId', '');
    // используем объект истории для перехода на страницу с чатом после авторизации пользователя
    const history = useHistory();

    // вытаскиваем параметры запроса на присоединение к комнате из URL в адресной строке
    let searchParam = useLocation().search;
    // присваиваем идентификатор комнаты из запроса на присоединение
    useEffect(() => {
        if (searchParam && !roomId) {
            const roomIdInvite = searchParam.substring(searchParam.indexOf('=') + 1);
            setRoomId(roomIdInvite);
        }
    }, [searchParam, roomId])
    
    // обрабатываем изменение имени пользователя
    const handleChangeName = (evt) => {
        setUsername(evt.target.value);
    };

    // присваиваем идентификатор новой комнате
    const generateNewRoomId = () => {
        setRoomId(nanoid(10));
    };

    // обрабатываем переход в чат-комнату
    const handleLogin = (evt) => {
        evt.preventDefault();
        // проверяем заходил/приглашен ли пользователь в чат-комнату
        if (!roomId) {
            generateNewRoomId();
        }
        // передаем в чат-комнату имя пользователя и id комнаты и переходим в нее
        history.push(`/${roomId}`, {username: username, roomId: roomId});
    };


    const trimmedUserName = username.trim();

    const RoomField = () => {
        
        return(
            <FormGroup>
                <Label>Room ID:</Label> 
                <input className="form-control"
                readOnly
                value={roomId}
                />
            </FormGroup>
        );
    };

    return (
        <Form
        className='home__form mt-5'
        style={{ maxWidth: '320px', margin: '0 auto' }}
        onSubmit={handleLogin}
        >
            <FormGroup>
                <Label>Name:</Label>
                <input 
                className="form-control" 
                type="text" 
                value={username}
                placeholder="anonymous"
                onChange={handleChangeName}
                />
            </FormGroup>
            {roomId ? RoomField() : ''}
            <Button 
            color={roomId ? 'success' : 'primary'}
            disabled={trimmedUserName ? false : true} 
            type='submit'
            onClick={handleLogin}
            >
                {roomId ? 'Enter Chat' : 'New Chat'}
            </Button>
        </Form>
    );
}

export default Home;