import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoadingButton from "../../../components/loading_button/LoadingButton";
import { useEffect, useState } from "react";
import { add } from "../../repositories/PlaceRepository";
import { toast } from "react-toastify";

const schema = yup
    .object()
    .shape({
        place: yup
            .string()
            .required('Insira um local')
    })
    .required();

export default function AddPlaceModal(props) {

    const [loadingButton, setLoadingButton] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit = async (data) => {
        setLoadingButton(true);
        const result = await add(data.place);
        setLoadingButton(false);

        if (result.message !== undefined) {
            toast.error(result.message);
            return;
        }

        toast.success('Local adicionado com sucesso');
        props.onAdded();
    };

    return (
        <Modal show={props.show} onHide={() => props.onClose()}>
            <Form noValidate validated={isValid} onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Local</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                </Modal.Body>

                <Modal.Footer>
                    <LoadingButton loading={loadingButton} type='submit'>Adicionar Local</LoadingButton>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}