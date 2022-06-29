import { Card, Container, Form, Row } from 'react-bootstrap';
import Menu from '../../components/menu/Menu';
import LoadingButton from '../../components/loading_button/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { Masonry } from 'masonic';
import { toast, ToastContainer } from 'react-toastify';
import { add, getAll } from '../repositories/PlaceRepository';

const schema = yup
    .object()
    .shape({
        place: yup
            .string()
            .required('Insira um local')
    })
    .required();

export default function PlacePage(props) {

    const [loadingButton, setLoadingButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        document.title = 'Eventos - Locais';
        loadAllPlaces();
    }, []);

    const onSubmit = async (data) => {
        setLoadingButton(true);
        const result = await add(data.place);
        setLoadingButton(false);

        if (result.message !== undefined) {
            toast.error(result.message);
            return;
        }

        reset();
        toast.success('Adicionado com sucesso');
        loadAllPlaces();
    }

    const loadAllPlaces = async () => {
        setLoading(true);
        const result = await getAll();
        setLoading(false);
       
        if (result.message !== undefined) {
            setPlaces([]);
            toast.error(result.message);
            return;
        }

        setPlaces(result.data);
        setLoading(false);
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
            <div className='m-2'>
                <Card key={data.id_place}>
                    <Card.Body>
                        <Card.Text>{data.description}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
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