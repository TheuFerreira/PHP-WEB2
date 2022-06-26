import { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import { getAllEvents, enterInEvent, getEventById } from '../repositories/HomeRepository';
import Context from '../../Context/Context';
import { Masonry } from 'masonic';
import { Container, Row } from "react-bootstrap";

export default function HomePage() {

    const [events, setEvents] = useState([]);
    const [usuario] = useContext(Context);
    const idUser = parseInt(usuario.id_user);

    useEffect(() => {
        getAllEvents(idUser).then((data) => setEvents(data));
    }, [idUser]);

    const MasonryCard = ({ index, data, width }) => {
        return <EventItemComponent 
            key={data.id_event} 
            width={width}
            data={data}
            usuario={usuario}
            onClick={(idEvent) => onEnterEvent(idEvent)}
        /> 
    }

    const onEnterEvent = async (idEvent) => {
        let result = await enterInEvent(idEvent, idUser);
        if (result.message !== undefined) {
            console.log(result.message);
            return;
        }

        result = await getEventById(idEvent, idUser);
        if (result.message !== undefined) {
            console.log(result.message);
            return;
        }

        let index = -1;
        for (let i = 0; i < events.length; i++) {
            if (events[i].id_event === result.data.id_event) {
                index = i;
            }
        }

        let tempEvents = [...events];
        tempEvents[index] = result.data;

        setEvents(tempEvents);
    }

    return (
        <div>
            <Menu/>

            <Container className='mt-4'>
                <Row className='text-center mb-4'>
                    <h3>Eventos</h3>
                </Row>

                <Masonry items={events} columnWidth={300} render={MasonryCard}/>
            </Container>
        </div>
    );
} 