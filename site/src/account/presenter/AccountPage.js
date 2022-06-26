import React, { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import Context from "../../Context/Context";
import { Masonry } from 'masonic';
import { Container } from "react-bootstrap";
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

            <div>
                <h3>Suas Informações</h3>

                <span>Nome Completo</span>
                <span>Email</span>
            </div>

            <Container fluid>
                <h3>Seus Eventos</h3>

                <Masonry items={userEvents} columnWidth={300} render={MasonryCard}/>
            </Container>

            <Container fluid>
                <h3>Eventos que participou</h3>

                <Masonry items={participatedEvents} columnWidth={300} render={MasonryCard}/>
            </Container>
        </div>
    );
}