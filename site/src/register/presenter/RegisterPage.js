import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { createAccount } from '../repositories/RegisterRepository';
import LoadingButton from '../../components/loading_button/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup
    .object()
    .shape({
        fullname: yup
            .string()
            .required('Insira seu nome completo')
            .min(5, 'Insira pelo menos 5 caracteres')
            .max(100, 'O limite máximo é de 100 caractres'),
        email: yup
            .string()
            .required('Insira um email')
            .email('Insira um email válido')
            .max(100, 'O limite máximo é de 100 caractres'),
        password: yup
            .string()
            .required('Insira uma senha')
            .min(4, 'A senha precisa ter pelo menos 4 caracteres')
            .max(50, 'O limite máximo é de 50 caractres')
    })
    .required();

export default function RegisterPage() {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoadingButton, setLoadingButton] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        document.title = 'Eventos - Cadastro';
    }, []);

    const onSubmit = async (data) => {
        setLoadingButton(true);
        const result = await createAccount(data.fullname, data.email, data.password);
        setLoadingButton(false);

        if (result.message !== undefined) {
            setError(result.message);
            return;
        }

        setError('');
        reset();
        toast('Usuário criado');
    }

    return (
        <Container fluid>
            <ToastContainer/>

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
                            <h2>Cadastar</h2>
                        </Container>

                        <Form 
                            noValidate 
                            validated={isValid} 
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Form.Group>
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control
                                    placeholder="example" 
                                    className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                                    {...register('fullname')}
                                />

                                <Form.Control.Feedback type='invalid'>
                                    {errors.fullname?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    placeholder="example@example.com" 
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    {...register('email')}
                                />

                                <Form.Control.Feedback type='invalid'>
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control
                                    placeholder="******" 
                                    type={'password'}
                                    autoComplete="true"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    {...register('password')}
                                />

                                <Form.Control.Feedback type='invalid'>
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row className='mb-2 mt-2'>
                                { error && <span className='text-danger'>{error}</span> }
                            </Row>

                            <div className='d-flex justify-content-between'>
                                <LoadingButton 
                                    loading={isLoadingButton} 
                                    type='submit'
                                >Cadastrar</LoadingButton>

                                <Button 
                                    type="button" 
                                    onClick={() => navigate('/')}
                                    style={{
                                        backgroundColor: '#0b549e',
                                        borderColor: '#0b549e'
                                    }}
                                >
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}