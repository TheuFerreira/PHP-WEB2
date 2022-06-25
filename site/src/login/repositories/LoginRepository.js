import { ipAPI } from "../../utils/ips";

export async function signIn(email, password) {
    const result = await fetch(`${ipAPI}/login/signin/${email}/${password}`, {
        method: 'GET'
    }).then((response) => {
        if (response.status === 204) {
            throw new Error('Usuário ou senha inválidos');
        } else if (!response.ok) {
            throw new Error('Estamos com problemas');
        }

        return response.json();
    }).then((json) => {
        return {
            data: json
        };
    }).catch((error) => {
        return {
            message: error.message,
        };
    });

    return result;
}