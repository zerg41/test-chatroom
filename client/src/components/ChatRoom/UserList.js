import { useState } from 'react';
// стили
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { BsFillCircleFill } from 'react-icons/bs';

function UserList({ users }) {

    const usersArr = Object.entries(users);
    // количество активных пользователей
    const activeUsersNumber = Object.values(users).filter((user) => user.online).length;

    const [accordionId, setAccordionId] = useState('');

    const accordionTogggle = () => {
        accordionId === '1' ? setAccordionId('') : setAccordionId('1');
    };

    return (
        <Accordion open={accordionId} toggle={accordionTogggle}>
            <AccordionItem>
                <AccordionHeader
                targetId="1"
                >
                    <BsFillCircleFill color={activeUsersNumber > 0 ? 'green' : 'gray'} />
                    <p className="ps-2 m-0">Users online: {activeUsersNumber}</p>
                </AccordionHeader>
                <AccordionBody accordionId="1">
                    {usersArr.map(([userId, obj], index) => {
                        if (obj.online === true) {
                            return(
                                <Card color="light" key={index}>
                                    <CardBody>
                                        <CardTitle tag="h5">{obj.username}</CardTitle>
                                        <CardSubtitle
                                        className="mb-2 text-muted" 
                                        tag="h6"
                                        >
                                            UserID: {userId}
                                        </CardSubtitle>
                                    </CardBody>
                                </Card>
                            );
                        } else return null;
                    })}
                </AccordionBody>
            </AccordionItem>
        </Accordion>
    );
}

export default UserList;