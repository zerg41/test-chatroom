import { nanoid } from 'nanoid';
// для маршрутизации используется react-router-dom
import { useHistory } from 'react-router-dom';
// кастомный хук
import { useLocalStorage } from '../hooks/useLocalStorage';
// стили
import { Form, Button, FormGroup, Label } from 'reactstrap';


function Home() {
    // создаем и записываем в локальное хранилище имя пользователя
    // или извлекаем его из хранилища
    const [username, setUsername] = useLocalStorage('username', '');
    // локальное состояние для комнаты
    const [roomId, setRoomId] = useLocalStorage('roomId', '');
    const locationHistory = useHistory();

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

        generateNewRoomId();
        locationHistory.push(`/${roomId}`);
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