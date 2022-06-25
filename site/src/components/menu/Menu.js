import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export default function Menu(props) {
    
    const navigate = useNavigate();
    const data = props.data;
    
    const onAccount = () => {
        navigate('/Conta/1');
    }

    const onNewEvent = () => {
        navigate('/CriarEvento');
    }

    const onExit = () => {
        props.onExit();
    }

    return (
        <Navbar className='shadow-sm' sticky="top">
            <Container fluid>
                <Navbar.Brand href="#" onClick={onAccount}>{data.fullname}</Navbar.Brand>

                <Navbar.Collapse className='justify-content-center'>
                    <Link to={'/'}>Logo</Link>
                </Navbar.Collapse>

                <Navbar.Collapse className='justify-content-end'>
                    <Nav.Link href='#' onClick={onNewEvent}>Criar Evento</Nav.Link>
                    <Nav.Link href='#' onClick={onExit}>Sair</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}