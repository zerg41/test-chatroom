// стили
import { ListGroupItem, Button, Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { AiOutlineDelete } from 'react-icons/ai';


function MessageListItem({ message, removeMessage }) {

    const handleRemoveMessage = (id) => {
      removeMessage(id);
    };

    const { messageId, messageText, senderName, createdAt, currentUser } = message;

    return (
        <ListGroupItem className={`d-flex ${currentUser ? "justify-content-end" : ''}`}>
            <Card
            inverse
            color={currentUser ? "primary" : "secondary"}
            style={{ width: '55%' }}
            >
                <CardHeader >
                    <CardTitle tag="h6" className="d-flex justify-content-between align-items-center">
                        {senderName}
                        {currentUser && (
                            <Button
                                className="btn btn-sm btn-outline-warning"
                                onClick={() => handleRemoveMessage(messageId)}
                            >
                                <AiOutlineDelete />
                            </Button>
                        )}
                    </CardTitle>
                    <CardSubtitle className="small">
                        {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric', month: 'short', day: '2-digit',
                                hour: 'numeric', minute: 'numeric', second: 'numeric',
                                hour12: false
                            })
                            .format(new Date(Date.parse(createdAt)))
                        }
                    </CardSubtitle>
                </CardHeader>
                <CardBody className="d-flex align-items-center">
                    <CardText>{messageText}</CardText>
                </CardBody>
            </Card>
        </ListGroupItem>
    );
}

export default MessageListItem;