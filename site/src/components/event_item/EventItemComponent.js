import { Card, Button, ListGroup, ListGroupItem, Container } from "react-bootstrap";

export default function EventItemComponent(props) {
    const data = props.data;
    const usuario = props.usuario;

    const onEnter = () => {
        props.onClick(data.id_event);
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
            <Button onClick={onEnter}>Ingressar</Button>
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
                    <ListGroupItem>Local: {data.local}</ListGroupItem>
                    <ListGroupItem>Data e Hora: {data.date}</ListGroupItem>
                </ListGroup>

                <Card.Footer>
                    {data.count_peoples} pessoa(s)
                </Card.Footer>
            </Card>
        </Container>
    );
}