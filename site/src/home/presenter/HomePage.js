import { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import { getAllEvents, enterInEvent, getEventById } from '../repositories/HomeRepository';
import Context from '../../Context/Context';
import Cookies from 'universal-cookie';
import { Col, Container, Row } from "react-bootstrap";

export default function HomePage() {

    const [events, setEvents] = useState([]);
    const [usuario, setUsuario] = useContext(Context);
    const idUser = parseInt(usuario.id_user);

    useEffect(() => {
        getAllEvents(idUser).then((data) => setEvents(data));
    }, [idUser]);

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

    const onExit = () => {
        const cookie = new Cookies();
        cookie.remove('user');
        setUsuario(null);
    }

    const generateRows = (size, maxPerRow) => {
        let rowsCount = size / maxPerRow;
        let rows = [];

        for (let i = 0; i < rowsCount; i ++) {
            let colsInRow = maxPerRow;
            if (colsInRow * (i + 1) > size) {
                colsInRow = size % maxPerRow;
            }

            rows.push((<Row> { generateCols(i, colsInRow, maxPerRow) } </Row>));
        }

        return rows;
    }

    const generateCols = (rowIndex, colsCount, maxPerRow) => {
        let cols = [];
        for (let i = 0; i < colsCount; i++) {
            let index = rowIndex * maxPerRow + i;
            cols.push((<Col> { generateItem(index) } </Col>))
        }

        return cols;
    }

    const generateItem = (index) => {
        return (
            <EventItemComponent 
                key={events[index].id_event} 
                data={events[index]}
                usuario={usuario}
                onClick={(idEvent) => onEnterEvent(idEvent)}
            /> 
        );
    }

    return (
        <div>
            <Menu onExit={onExit}/>

            <Container>
                <Row className='text-center mb-4'>
                    <h3>Eventos</h3>
                </Row>

                { generateRows(events.length, 3) }
            </Container>
        </div>
    );
} 