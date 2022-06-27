import { ipAPI } from '../../utils/ips';

export async function create(idUser, title, description, date, local) {
    const data = {
        "id_user": parseInt(idUser),
        "title": title,
        "description": description,
        "date": date,
        "local": local
    };

    const result = await fetch(`${ipAPI}/event`, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Estamos com problemas');
        }

        return response.json;
    }).then((json) => {
        return {
            data: json
        };
    }).catch((error) => {
        return {
            message: error.message
        };
    });

    return result;
}