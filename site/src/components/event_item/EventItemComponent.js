import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function EventItemComponent(props) {
    const data = props.data;

    const onEnter = () => {
        props.onClick(data.id_event);
    }

    return (
        <Card 
            key={data.id_event} 
            className='m-2' 
            style={{width: '20rem'}}
        >
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.description}</Card.Text>
        
                <Button onClick={onEnter}>Ingressar</Button>
            </Card.Body>

            <ListGroup>
                <ListGroupItem>Local: {data.local}</ListGroupItem>
                <ListGroupItem>Data e Hora: {data.date}</ListGroupItem>
            </ListGroup>

            <Card.Footer>
                {data.count_peoples} pessoas
            </Card.Footer>
        </Card>
    );
}