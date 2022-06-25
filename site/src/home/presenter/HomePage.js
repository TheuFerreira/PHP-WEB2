import { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import { getAllEvents } from '../repositories/HomeRepository';
import Context from '../../Context/Context';
import Cookies from 'universal-cookie';
import { ipAPI } from "../../utils/ips";

export default function HomePage() {

    const [events, setEvents] = useState([]);
    const [usuario, setUsuario] = useContext(Context);

    useEffect(() => {
        getAllEvents().then((data) => setEvents(data));
    }, []);

    const onEnterEvent = (idEvent) => {
        const idUser = parseInt(usuario.id_user);
        const data = {
            "id_event": idEvent,
            "id_user": idUser
        };

        console.log(data);

        fetch(`${ipAPI}/event/enter`, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Estamos com problemas');
            }

            return response.json();
        }).then((json) => {
            console.log(json);
        }).catch((error) => {
            console.log(error);
        });
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