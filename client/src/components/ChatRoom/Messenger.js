import MessageForm from './Messenger/MessageForm';
import MessageList from './Messenger/MessageList';


function Messenger({messages, removeMessage, username, sendMessage, roomId}) {

    return(
        <div>
            <MessageList messages={messages} removeMessage={removeMessage} roomId={roomId} />
            <MessageForm username={username} sendMessage={sendMessage} roomId={roomId} />
        </div>
    );
}

export default Messenger;