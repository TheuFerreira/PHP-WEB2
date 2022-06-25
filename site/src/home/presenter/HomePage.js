import { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import { getAllEvents, enterInEvent, getEventById } from '../repositories/HomeRepository';
import Context from '../../Context/Context';
import Cookies from 'universal-cookie';

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

    return (
        <div>
            <Menu onExit={onExit}/>

            <div>
                { 
                    events.map((x) => 
                        <EventItemComponent 
                            key={x.id_event} 
                            data={x}
                            usuario={usuario}
                            onClick={(idEvent) => onEnterEvent(idEvent)}
                        /> 
                    ) 
                }
            </div>
        </div>
    );
} 