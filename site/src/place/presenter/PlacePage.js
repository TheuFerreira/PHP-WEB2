import { Card, Container, Form, Row } from 'react-bootstrap';
import Menu from '../../components/menu/Menu';
import LoadingButton from '../../components/loading_button/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { Masonry } from 'masonic';
import { ipAPI } from '../../utils/ips';
import { toast, ToastContainer } from 'react-toastify';

const schema = yup
    .object()
    .shape({
        place: yup
            .string()
            .required('Insira um local')
    })
    .required();

const _places = [
    {
        "id_place": 1,
        "description": "SJE"
    }
];

export default function PlacePage(props) {

    const [loadingButton, setLoadingButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState(_places);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setLoading(true);
        setPlaces([]);
        setLoading(false);
    }, []);

    const onSubmit = (data) => {
        const body = {
            "description": data.place,
        };

        setLoadingButton(true);

        fetch(`${ipAPI}/place`, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Estamos com problemas');
            }

            return response.json();
        }).then((json) => {
            setLoadingButton(false);
            reset();
            toast.success('Adicionado com sucesso');
        }).catch((error) => {
            setLoadingButton(false);
            console.log(error);
        });
    }

    const showPlaces = () => {
        if (places.length === 0) {
            return (
                <Container className='d-flex justify-content-center'>
                    <span
                        style={{
                            marginTop: 50,
                            fontSize: 20
                        }}
                    >Nenhum local encontrado</span>
                </Container>
            );
        }

        return <Masonry items={places} columnWidth={200} render={masonryCard} />
    }

    const masonryCard = ({index, data, width}) => {
        return (
            <Card key={data.id_place}>
                <Card.Body>
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div>
            <ToastContainer/>
            
            <Menu/>

            <Container className='mt-4'>
                <Row style={{width: 300}}>
                    <Form noValidate validated={isValid} onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label>Local:</Form.Label>
                            <Form.Control 
                                placeholder='Local' 
                                className={`form-control ${errors.place ? 'is-invalid' : ''}`}
                                {...register('place')}
                            />

                            <Form.Control.Feedback type='invalid'>
                                {errors.place?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className='mt-3'>
                            <LoadingButton loading={loadingButton} type='submit'>Adicionar Local</LoadingButton>
                        </div>
                    </Form>
                </Row>
            </Container>

            <Container className='mt-4'>
                <Container className='d-flex justify-content-center'>
                    <h2>Locais</h2>
                </Container>

                {
                    loading 
                    ? <Loading/>
                    : showPlaces()
                }
            </Container>
        </div>
    );
}