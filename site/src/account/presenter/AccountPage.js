import React, { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import Context from "../../Context/Context";
import { Masonry } from 'masonic';
import { Container, Form } from "react-bootstrap";
import { getAllEnteredEventsByUser, getAllEventsByUser } from '../repositories/AccountRepository';

export default function AccountPage() {

    const [usuario] = useContext(Context);
    const [userEvents, setUserEvents] = useState([]);
    const [participatedEvents, setParticipatedEvents] = useState([]);

    const idUser = usuario.id_user;

    useEffect(() => {
        loadAllEventsOfUser();
        loadAllEnteredEventsOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAllEventsOfUser = async () => {
        const response = await getAllEventsByUser(idUser);
        if (response.message !== undefined) {
            setUserEvents([]);
            return;
        }

        setUserEvents(response.data);
    }

    const loadAllEnteredEventsOfUser = async () => {
        const response = await getAllEnteredEventsByUser(idUser);
        if (response.message !== undefined) {
            setUserEvents([]);
            return;
        }

        setParticipatedEvents(response.data);
    }

    const MasonryCard = ({ index, data, width }) => {
        return <EventItemComponent 
            key={data.id_event} 
            width={width}
            data={data}
            usuario={usuario}
        /> 
    }

    return (
        <div>
            <Menu/>

            <Container className='mt-2 mb-4'>
                <Container className='d-flex justify-content-center mb-2 mt-2'>
                    <h3>Suas Informações</h3>
                </Container>

                <div style={{width: 400}}>
                    <Form.Group className='m-2'>
                        <Form.Label>Nome Completo:</Form.Label>
                        <Form.Control readOnly defaultValue={usuario.fullname}/>
                    </Form.Group>

                    <Form.Group className='m-2'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control readOnly defaultValue={usuario.email}/>
                    </Form.Group>
                </div>

            </Container>

            <Container fluid>
                <Container className='d-flex justify-content-center mb-2 mt-2'>
                    <h3>Seus Eventos</h3>
                </Container>

                <Masonry items={userEvents} columnWidth={300} render={MasonryCard}/>
            </Container>

            <Container fluid>
                <Container className='d-flex justify-content-center mb-2 mt-2'>
                    <h3>Eventos que participou</h3>
                </Container>

                <Masonry items={participatedEvents} columnWidth={300} render={MasonryCard}/>
            </Container>
        </div>
    );
}