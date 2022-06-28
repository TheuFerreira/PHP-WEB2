import { useState } from "react";
import { Card, ListGroup, ListGroupItem, Container } from "react-bootstrap";
import LoadingButton from '../loading_button/LoadingButton';

export default function EventItemComponent(props) {
    const data = props.data;
    const usuario = props.usuario;

    const [loading, setLoading] = useState(false);

    const onEnter = async () => {
        setLoading(true);
        await props.onClick(data.id_event);
        setLoading(false);
    }

    const showActionEnter = () => {
        if (parseInt(usuario.id_user) === data.id_user) {
            return <div>
                <span className="text-muted">Você criou</span>
            </div>;
        }

        if (data.is_in_event) {
            return (
                <span>Ingressado</span>
            );
        }

        return (
            <LoadingButton 
                loading={loading} 
                onClick={onEnter}
            >Ingressar</LoadingButton>
        );
    }

    return (
        <Container style={{width: props.width}}>
            <Card 
                key={data.id_event} 
                className="mb-4"
            >
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>
            
                    { showActionEnter() }
                </Card.Body>

                <ListGroup>
                    <ListGroupItem>Local: {data.place}</ListGroupItem>
                    <ListGroupItem>Data e Hora: {data.date}</ListGroupItem>
                </ListGroup>

                <Card.Footer>
                    {data.count_peoples} pessoa(s)
                </Card.Footer>
            </Card>
        </Container>
    );
}