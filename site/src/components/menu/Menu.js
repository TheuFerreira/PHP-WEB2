import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Logo from '../../assets/images/eventos.png';
import Cookies from 'universal-cookie';
import Context from '../../Context/Context';

export default function Menu(props) {
    
    const navigate = useNavigate();
    const [usuario, setUsuario] = useContext(Context);
    
    const onPlace = () => {
        navigate('/Locais');
    }

    const onNewEvent = () => {
        navigate('/CriarEvento');
    }

    const onExit = () => {
        const cookie = new Cookies();
        cookie.remove('user');
        setUsuario(null);
    }

    return (
        <Navbar className='shadow-sm bg-light' sticky="top">
            <Container fluid>
                <Navbar.Brand href="/Conta">{usuario.fullname}</Navbar.Brand>

                <Navbar.Collapse className='justify-content-center'>
                    <Link to={'/'}>
                        <img 
                            src={Logo} 
                            alt="logo" 
                            style={{height: 40}}
                        />
                    </Link>
                </Navbar.Collapse>

                <Navbar.Collapse className='justify-content-end'>
                    <Nav.Link
                        href="#"
                        onClick={onPlace}
                        style={{
                            color: '#0b549e',
                        }}
                    >Locais</Nav.Link>
                    <Nav.Link 
                        href='#' 
                        onClick={onNewEvent}
                        style={{
                            color: '#0b549e',
                        }}
                    >Criar Evento</Nav.Link>
                    <Nav.Link 
                        href='#' 
                        onClick={onExit}
                        style={{
                            color: '#0b549e',
                        }}
                    >Sair</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}