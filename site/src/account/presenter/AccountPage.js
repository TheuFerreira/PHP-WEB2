import React, { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import Context from "../../Context/Context";
import { Masonry } from 'masonic';
import { ipAPI } from '../../utils/ips';

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
    },
    {
        'id_event': 3,
        'id_user': 1,
        'title': 'Campeonato de Mortal Kombat',
        'description': 'Campeonato emocionante de Mortal Kombat valendo uma Coca Cola de 2 Litros',
        'count_peoples': '6',
        'date': '2022-06-07T15:00',
        'local': 'IFMG SJE - Prédio 3',
    },
    {
        'id_event': 4,
        'id_user': 1,
        'title': 'Campeonato de Mortal Kombat',
        'description': 'Campeonato emocionante de Mortal Kombat valendo uma Coca Cola de 2 Litros',
        'count_peoples': '6',
        'date': '2022-06-07T15:00',
        'local': 'IFMG SJE - Prédio 3',
    }
];

export default function AccountPage() {

    const [usuario] = useContext(Context);
    const [userEvents, setUserEvents] = useState([]);
    const [participatedEvents] = useState(_events);

    const idUser = usuario.id_user;

    useEffect(() => {
        fetch(`${ipAPI}/user/AllEvents/${idUser}`, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Estamos com problemas');
            }

            return response.json();
        }).then((json) => {
            setUserEvents(json);
        }).catch((error) => {
            console.log(error.message)
        });
    }, [idUser]);

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

            <div>
                <h3>Seus Eventos</h3>

                <Masonry items={userEvents} columnWidth={300} render={MasonryCard}/>
            </div>

            <div>
                <h3>Eventos que participou</h3>

                <Masonry items={participatedEvents} columnWidth={300} render={MasonryCard}/>
            </div>
        </div>
    );
}