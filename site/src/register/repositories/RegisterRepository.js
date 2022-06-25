import { ipAPI } from "../../utils/ips";

export async function createAccount(fullname, email, password) {
    const data = {
        "fullname": fullname,
        "email": email,
        "password": password
    };

    const result = await fetch(`${ipAPI}/login/register`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Já existe um usuário com este email');
            }

            throw new Error('Estamos com problemas');
        }

        return {
            data: response.json()
        };
    }).then((json) => {
        return json;
    }).catch((error) => {
        return {
            message: error.message,
        };
    });

    return result;
}