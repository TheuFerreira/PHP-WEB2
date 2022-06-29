import { ipAPI } from '../../utils/ips';

export async function add(description) {
    const body = {
        "description": description,
    };

    const result = await fetch(`${ipAPI}/place`, {
        method: 'POST',
        body: JSON.stringify(body)
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

export async function getAll() {
    const result = fetch(`${ipAPI}/place/all`, {
        method: 'GET',
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