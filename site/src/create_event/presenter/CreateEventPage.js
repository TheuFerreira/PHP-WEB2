import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Menu from '../../components/menu/Menu';
import { useContext, useState } from 'react';
import Context from '../../Context/Context';
import { create } from '../repositories/CreateEventRepository';
import { Col, Container, Form, Row } from 'react-bootstrap';
import LoadingButton from '../../components/loading_button/LoadingButton';

const schema = yup
    .object()
    .shape({
        title: yup.string().required('Insira o título'),
        description: yup.string().required('Insira uma descrição'),
        date: yup.date().required('Insira uma data'),
        local: yup.string().required('Insira o Local'),
    })
    .required();

export default function CreateEventPage(props) {

    const [usuario] = useContext(Context);
    const [isLoadingButton, setLoadingButton] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoadingButton(true);
        const response = await create(parseInt(usuario.id_user), data.title, data.description, data.date.toISOString().slice(0, -5), data.local);
        setLoadingButton(false);
        
        if (response.message) {
            console.log(response.message);
            return;
        }

        reset();
    }

    return (
        <div>
            <Menu/>

            <Container fluid>
                <Row className='vh-100'>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <Container 
                            fluid
                            className='p-4'
                            style={{
                                maxWidth: 475,
                                borderRadius: 16,
                                backgroundColor: 'white',
                                boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <Container className='d-flex justify-content-center mb-2'>
                                <h2>Criar Evento</h2>
                            </Container>

                            <Form 
                                noValidate 
                                validated={isValid} 
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Form.Group>
                                    <Form.Label>Título:</Form.Label>
                                    <Form.Control
                                        placeholder="example" 
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        {...register('title')}
                                    />

                                    <Form.Control.Feedback type='invalid'>
                                        {errors.title?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Descrição:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        {...register('description')}
                                    />

                                    <Form.Control.Feedback type='invalid'>
                                        {errors.description?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Local:</Form.Label>
                                    <Form.Control
                                        className={`form-control ${errors.local ? 'is-invalid' : ''}`}
                                        {...register('local')}
                                    />

                                    <Form.Control.Feedback type='invalid'>
                                        {errors.local?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Data:</Form.Label>
                                    <Form.Control
                                        placeholder='0000-00-00T00:00'
                                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                        {...register('date')}
                                    />

                                    <Form.Control.Feedback type='invalid'>
                                        {errors.date?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className='d-flex justify-content-center mt-4'>
                                    <LoadingButton 
                                        type="submit"
                                        loading={isLoadingButton}
                                    >
                                        Criar Evento
                                    </LoadingButton>
                                </div>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}