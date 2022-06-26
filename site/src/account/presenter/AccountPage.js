import React, { useContext, useEffect, useState } from "react";
import Menu from "../../components/menu/Menu";
import EventItemComponent from '../../components/event_item/EventItemComponent';
import Context from "../../Context/Context";
import { Masonry } from 'masonic';
import { ipAPI } from '../../utils/ips';
import { Container } from "react-bootstrap";

export default function AccountPage() {

    const [usuario] = useContext(Context);
    const [userEvents, setUserEvents] = useState([]);
    const [participatedEvents, setParticipatedEvents] = useState([]);

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

        fetch(`${ipAPI}/user/EnteredEvents/${idUser}`, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Estamos com problemas');
            }

            return response.json();
        }).then((json) => {
            setParticipatedEvents(json);
        }).catch((error) => {
            console.log(error);
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

            <Container fluid>
                <h3>Seus Eventos</h3>

                <Masonry items={userEvents} columnWidth={300} render={MasonryCard}/>
            </Container>

            <Container fluid>
                <h3>Eventos que participou</h3>

                <Masonry items={participatedEvents} columnWidth={300} render={MasonryCard}/>
            </Container>
        </div>
    );
}