import { useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';

const _events = [
    {
        'id_event': 1,
        'title': 'Campeonato de FIFA 17',
        'description': 'Campeonato emocionante de FIFA 17 valendo uma Coca Cola de 2 Litros',
        'count_peoples': '15',
        'date': '2022-06-06T15:00',
        'local': 'IFMG SJE - Prédio 2',
    },
    {
        'id_event': 2,
        'title': 'Campeonato de Mortal Kombat',
        'description': 'Campeonato emocionante de Mortal Kombat valendo uma Coca Cola de 2 Litros',
        'count_peoples': '6',
        'date': '2022-06-07T15:00',
        'local': 'IFMG SJE - Prédio 3',
    }
];

export default function Home() {

    const [events] = useState(_events);

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