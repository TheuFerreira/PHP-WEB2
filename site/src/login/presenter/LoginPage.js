import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup
    .object()
    .shape({
        email: yup
            .string()
            .required('Insira um email')
            .email('Insira um email válido')
            .max(50, 'O limite máximo é de 100 caractres'),
        password: yup
            .string()
            .required('Insira uma senha')
            .min(4, 'A senha precisa ter pelo menos 4 caracteres')
            .max(50, 'O limite máximo é de 50 caractres')
    })
    .required();

export default function LoginPage() {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {

        fetch(`http://localhost/web2/api/login/signin/${data.email}/${data.password}`, {
            method: 'GET'
        }).then((response) => {
            if (response.status === 204) {
                setError('Usuário ou senha inválidos');
                throw new Error();
            } else if (!response.ok) {
                setError('Estamos com problemas');
                throw new Error();
            }

            return response.json();
        }).then((json) => {
            setError('');
            console.log(json);
            navigate('/Inicio');
        }).catch(() => {
            setError('Estamos com problemas');
        });
    }

    return (
        <div>
            <button 
                type="button" 
                onClick={() => navigate('/Registrar')}>Cadastre-se</button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    placeholder="example@example.com" 
                    {...register('email')}/>
                { errors.email && <span>{errors.email?.message}</span> }

                <input 
                    placeholder="******" 
                    type={'password'}
                    autoComplete="true"
                    {...register('password')}/>
                { errors.password && <span>{errors.password?.message}</span> }

                { error && <span>{error}</span> }

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}