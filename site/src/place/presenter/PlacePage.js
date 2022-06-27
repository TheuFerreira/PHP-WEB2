import { Container, Form, Row } from 'react-bootstrap';
import Menu from '../../components/menu/Menu';
import LoadingButton from '../../components/loading_button/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const schema = yup
    .object()
    .shape({
        place: yup.string().required('Insira um local')
    })
    .required();

export default function PlacePage(props) {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {

    }

    return (
        <div>
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
                        
                        <LoadingButton className='pt-2' type='submit'>Adicionar Local</LoadingButton>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}