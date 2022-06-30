import { Button, Spinner } from "react-bootstrap";

export default function LoadingButton(props) {

    const loading = props.loading;
    const opacity = loading ? 0 : 1;

    const showSpinner = () => {
        if (!loading) {
            return null;
        }

        return (
            <div 
                className="position-absolute d-flex justify-content-center align-items-center" 
                style={{
                    left: 0, 
                    right: 0, 
                    top: 0, 
                    bottom: 0
                }}
            >
                <Spinner animation="border" size="sm"/>
            </div>
        );
    }

    const onClick = () => {
        if (props.onClick !== undefined) {
            props.onClick();
        }
    }

    return (
        <Button 
            type={loading ? 'button' :props.type} 
            className='position-relative'
            onClick={onClick}
            style={{
                backgroundColor: props.color ? props.color : '#0b549e',
                borderColor: props.color ? props.color : '#0b549e'
            }}
        >
            { showSpinner() }
            <div style={{opacity: opacity}}>{props.children}</div>
        </Button>
    );
}