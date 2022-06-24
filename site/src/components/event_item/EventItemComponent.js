export default function EventItemComponent(props) {
    const data = props.data;

    const onEnter = () => {
        props.onClick(data.id_event);
    }

    return (
        <div key={data.id_event}>
            <div>Imagem de Evento</div>

            <div>{data.title}</div>
            <div>{data.description}</div>

            <div>
                <div>{data.date}</div>
                <div>{data.local}</div>
            </div>

            <div>
                <div>{data.count_peoples} pessoas</div>
                <button onClick={onEnter}>Participar</button>
            </div>
        </div>
    );
}