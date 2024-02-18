import { API_URL } from '../consts';

/**
 11 digits string, no space, brackets, or +
 */
type PhoneNumber = string;

interface LoginData {
    phone: PhoneNumber;
    password: string;
}
interface RegisterData {
    phone: PhoneNumber;
    password: string;
    fullname: string;
}

interface confirmRegisterPhoneData {
    temp_data_code: string;
    confirmation_code: string;
}

export interface User {
    phone: PhoneNumber;
    fullname: string;
    auth_token: string;
    role?: 'CLIENT';
}

class AuthApi {
    async login({ phone, password }: LoginData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        const res = await fetch(`${API_URL}/signin/`, { method: 'POST', body: JSON.stringify({ phone, password }) });
        const result = await res.json();
        return result;
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ status: 'success'; data: { temp_data_code: string } } | { status: 'error'; error_message: string }> {
        const res = await fetch(`${API_URL}/client/request_to_signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ phone, password, fullname }),
        });
        const result = await res.json();
        return result;
    }

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: confirmRegisterPhoneData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        const res = await fetch(`${API_URL}/client/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ temp_data_code, confirmation_code }),
        });
        const result = await res.json();
        return result;
    }

    async loguOut(token: string): Promise<{ status: string }> {
        const res = await fetch(`${API_URL}/client/signout/`, {
            method: 'POST',
            headers: {
                authorization: `Token ${token}`,
            },
        });
        const result = await res.json();
        return result;
    }
}

export const authApi = new AuthApi();
