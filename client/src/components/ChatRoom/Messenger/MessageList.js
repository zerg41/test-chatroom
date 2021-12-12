import { useRef, useEffect } from 'react';
// стили
import { ListGroup } from 'reactstrap';
// компонент
import MessageListItem from './MessageList/MessageListItem';


function MessageList({ messages, removeMessage }) {
    // данный "якорь" нужен для выполнения прокрутки при добавлении в список нового сообщения
    const messagesEndRef = useRef(null);

    // плавная прокрутка, выполняемая при изменении массива сообщений
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    return (
        <ListGroup className='message__list'>
            {messages.map((message) => (
                <MessageListItem
                key={message.messageId}
                message={message}
                removeMessage={removeMessage}
                />
            ))}
            <span ref={messagesEndRef}></span>
        </ListGroup>
    );
}

export default MessageList;