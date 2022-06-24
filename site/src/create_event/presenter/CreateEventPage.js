import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Menu from '../../components/menu/Menu';

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {

    }

    return (
        <div>
            <Menu/>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    placeholder="Título"
                    {...register('title')}/>
                { errors.title && <span>{errors.title?.message}</span> }
                
                <input 
                    placeholder="Descrição"
                    {...register('description')}/>
                { errors.description && <span>{errors.description?.message}</span> }
                
                <input 
                    type={'date'}
                    {...register('date')}/>
                { errors.date && <span>{errors.date?.message}</span> }
                    
                
                <input 
                    placeholder="Local"
                    {...register('local')}/>
                { errors.local && <span>{errors.local?.message}</span> }

                <button>Criar Evento</button>
            </form>
        </div>
    );
}