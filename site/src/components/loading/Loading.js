import { Spinner } from 'react-bootstrap';

export default function Loading() {
    const size = 50;

    return (
        <div className="d-flex justify-content-center">
            <div className='d-flex flex-column align-items-center'>
                <Spinner 
                    animation='border' 
                    style={{
                        color: '#0b549e', 
                        height: size, 
                        width: size
                    }}
                />
                <span 
                    className='text-muted mt-2' 
                    style={{
                        fontSize: 20
                    }}
                >Carregando...</span>
            </div>
        </div>
    );
}