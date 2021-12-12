import { useState } from 'react';
// стили
import { Form, FormGroup, Button, Input } from 'reactstrap';
import { FiSend } from 'react-icons/fi';


function MessageForm({ username, sendMessage, roomId }) {
    // локальное состояние для текста сообщения
    const [text, setText] = useState('');

    // обрабатываем изменение текста
    const handleChangeText = (evt) => {
        setText(evt.target.value);
    };

    // обрабатываем отправку сообщения
    const handleSendMessage = (evt) => {
        evt.preventDefault();
    
        const trimmed = text.trim();
        if (trimmed) {
            sendMessage({ messageText: text, senderName: username, roomId: roomId });
            setText('');
        }
    };

    return (
        <Form onSubmit={(evt) => handleSendMessage(evt)}>
            <FormGroup className='d-flex'>
                <Input
                    value={text}
                    onChange={(evt) => handleChangeText(evt)}
                    type='text'
                    placeholder='Message...'
                />
                <Button color='success' type='submit'>
                    <FiSend />
                </Button>
            </FormGroup>
        </Form>
    );
}

export default MessageForm;