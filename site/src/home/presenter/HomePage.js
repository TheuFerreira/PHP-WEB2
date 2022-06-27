import { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import { getAllEvents, enterInEvent, getEventById } from '../repositories/HomeRepository';
import Context from '../../Context/Context';
import { Masonry } from 'masonic';
import { Container, Row } from "react-bootstrap";
import Loading from "../../components/loading/Loading";
import { ToastContainer, toast } from 'react-toastify';

export default function HomePage() {

    const [usuario] = useContext(Context);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const idUser = parseInt(usuario.id_user);

    useEffect(() => {
        document.title = 'Eventos';

        setLoading(true);
        getAllEvents(idUser).then((data) => {
            setEvents(data);

            setLoading(false);
        });
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
            toast.error(result.message);
            return;
        }

        result = await getEventById(idEvent, idUser);
        if (result.message !== undefined) {
            toast.error(result.message);
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
            <ToastContainer/>
            
            <Menu/>

            <Container className='mt-4'>
                <Row className='text-center mb-4'>
                    <h2>Eventos</h2>
                </Row>

                { 
                    loading 
                    ? <Loading/>
                    : <Masonry items={events} columnWidth={300} render={MasonryCard}/>
                }
                
            </Container>
        </div>
    );
} 