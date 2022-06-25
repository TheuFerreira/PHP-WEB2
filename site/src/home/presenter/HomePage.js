import { useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import { getAllEvents } from '../repositories/HomeRepository';

export default function HomePage() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAllEvents().then((data) => setEvents(data));
    }, []);

    const onEnterEvent = (idEvent) => {
    }

    return (
        <div>
            <Menu/>

            <div>
                { 
                    events.map((x) => 
                        <EventItemComponent 
                            key={x.id_event} 
                            data={x}
                            onClick={(idEvent) => onEnterEvent(idEvent)}
                        /> 
                    ) 
                }
            </div>
        </div>
    );
} 