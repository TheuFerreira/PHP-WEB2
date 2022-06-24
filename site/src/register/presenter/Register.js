import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup
    .object()
    .shape({
        fullname: yup
            .string()
            .required('Insira seu nome completo')
            .min(10, 'Insira pelo menos 10 caracteres')
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

export default function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        navigate('/');
    }

    return (
        <div>
            <button type="button" onClick={() => navigate('/')}>Entrar</button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    placeholder='Nome completo' 
                    {...register('fullname')}/>
                { errors.fullname && <span>{errors.fullname?.message}</span> }

                <input 
                    placeholder='example@example.com' 
                    {...register('email')}/>
                { errors.email && <span>{errors.email?.message}</span> }

                <input 
                    placeholder='******' 
                    {...register('password')}/>
                { errors.password && <span>{errors.password?.message}</span> }

                <button type='submit'>Registrar</button>
            </form>
        </div>
    );
}