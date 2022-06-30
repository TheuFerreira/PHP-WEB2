import { ipAPI } from '../../utils/ips';

export async function getAllEvents(idUser) {
    const result = await fetch(`${ipAPI}/event/all/${idUser}`, {
        method: 'GET',
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Estamos com problemas');
        }

        return response.json();
    }).then((json) => {
        return json;
    }).catch(() => {
        return [];
    });

    return result;
}

export async function enterInEvent(idEvent, idUser) {
    const data = {
        "id_event": idEvent,
        "id_user": idUser
    };

    const result = await fetch(`${ipAPI}/event/enter`, {
        method: 'POST',
        body: JSON.stringify(data),
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

export async function exitOfEvent(idEvent, idUser) {
    const data = {
        "id_event": idEvent,
        "id_user": idUser
    };

    const result = await fetch(`${ipAPI}/event/exit`, {
        method: 'POST',
        body: JSON.stringify(data),
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