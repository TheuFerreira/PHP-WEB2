import { ipAPI } from '../../utils/ips';

export async function getAllEvents() {
    const result = await fetch(`${ipAPI}/event/all`, {
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