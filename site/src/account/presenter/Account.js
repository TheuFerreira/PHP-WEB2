import { useContext, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import Context from "../../Context/Context";

const _events = [
    {
        'id_event': 1,
        'id_user': 1,
        'title': 'Campeonato de FIFA 17',
        'description': 'Campeonato emocionante de FIFA 17 valendo uma Coca Cola de 2 Litros',
        'count_peoples': '15',
        'date': '2022-06-06T15:00',
        'local': 'IFMG SJE - Prédio 2',
    },
    {
        'id_event': 2,
        'id_user': 1,
        'title': 'Campeonato de Mortal Kombat',
        'description': 'Campeonato emocionante de Mortal Kombat valendo uma Coca Cola de 2 Litros',
        'count_peoples': '6',
        'date': '2022-06-07T15:00',
        'local': 'IFMG SJE - Prédio 3',
    }
];

export default function Account() {

    const [usuario] = useContext(Context);
    const [userEvents] = useState(_events);
    const [participatedEvents] = useState(_events);

    return (
        <div>
            <Menu/>

            <div>
                <h3>Suas Informações</h3>

                <span>Nome Completo</span>
                <span>Email</span>
            </div>

            <div>
                <h3>Seus Eventos</h3>

                { 
                    userEvents.map((x) => 
                        <EventItemComponent 
                            key={x.id_event} 
                            data={x}
                            usuario={usuario}
                        /> 
                    ) 
                }
            </div>

            <div>
                <h3>Eventos que participou</h3>

                { 
                    participatedEvents.map((x) => 
                        <EventItemComponent 
                            key={x.id_event} 
                            data={x}
                            usuario={usuario}
                        /> 
                    ) 
                }
            </div>
        </div>
    );
}