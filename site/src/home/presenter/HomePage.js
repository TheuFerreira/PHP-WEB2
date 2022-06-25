import { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import { getAllEvents } from '../repositories/HomeRepository';
import Context from '../../Context/Context';

export default function HomePage() {

    const [events, setEvents] = useState([]);
    const [usuario] = useContext(Context);

    useEffect(() => {
        getAllEvents().then((data) => setEvents(data));
    }, []);

    const onEnterEvent = (idEvent) => {
    }

    return (
        <div>
            <Menu data={usuario}/>

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