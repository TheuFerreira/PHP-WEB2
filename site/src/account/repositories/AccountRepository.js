import { ipAPI } from '../../utils/ips';

export async function getAllEventsByUser(idUser) {
    const response = await fetch(`${ipAPI}/user/AllEvents/${idUser}`, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Estamos com problemas');
        }

        return response.json();
    }).then((json) => {
        return {
            data: json
        };
    }).catch((error) => {
        return {
            message: error.message
        };
    });

    return response;
}

export async function getAllEnteredEventsByUser(idUser) {
    const result = await fetch(`${ipAPI}/user/EnteredEvents/${idUser}`, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Estamos com problemas');
        }

        return response.json();
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