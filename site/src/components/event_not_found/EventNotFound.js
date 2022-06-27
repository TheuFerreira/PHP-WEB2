import { Container } from "react-bootstrap";

export default function EventNotFound() {
    return (
        <Container className='d-flex justify-content-center'>
            <span
                style={{
                    marginTop: 50,
                    fontSize: 20
                }}
            >Nenhum evento encontrado</span>
        </Container>
);
}