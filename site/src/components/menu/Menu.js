import { useNavigate, Link } from "react-router-dom";

export default function Menu(props) {
    
    const navigate = useNavigate();
    
    const onAccount = () => {
        navigate('/Conta/1');
    }

    const onNewEvent = () => {
        navigate('/CriarEvento');
    }

    const onExit = () => {
        navigate('/');
    }

    return (
        <nav>
            <div>
                <button onClick={onAccount}>Conta</button>
            </div>

            <div>
                <Link to={'/'}>Logo</Link>
            </div>

            <div>
                <button onClick={onNewEvent}>Criar Evento</button>
                <button onClick={onExit}>Sair</button>
            </div>
        </nav>
    );
}