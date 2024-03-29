import { AuthService } from './authService';
import { User, LoginData, RegisterData, СonfirmRegisterPhoneData, UpdateUser } from './authService';
import { API_URL } from '../consts';

export class AuthServiceReal implements AuthService {
    /* contracts https://www.notion.so/Api-Auth-b7317228f7134259a5089a7d05e79bb2 */

    getToken() {
        return localStorage.getItem('token');
    }

    async login({ phone, password }: LoginData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        const res = await fetch(`${API_URL}/signin/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ phone, password }),
        });
        const resultWithToken = await res.json();
        const { auth_token } = resultWithToken.data;
        const result = { ...resultWithToken };
        localStorage.setItem('token', auth_token);

        delete result.data.auth_token;
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

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: СonfirmRegisterPhoneData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        const res = await fetch(`${API_URL}/client/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ temp_data_code, confirmation_code }),
        });
        const resultWithToken = await res.json();
        const { auth_token } = resultWithToken.data;
        const result = { ...resultWithToken };
        localStorage.setItem('token', auth_token);

        delete result.data.auth_token;
        return result;
    }

    async logOut() {
        const token = this.getToken();
        await fetch(`${API_URL}/client/signout/`, {
            method: 'POST',
            headers: {
                authorization: `Token ${token}`,
            },
        });
        localStorage.removeItem('token');
    }

    async updateUser({ fullname, phone }: UpdateUser): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        const res = await fetch(`${API_URL}/client/profile/update_request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ fullname, phone }),
        });

        const result = await res.json();
        return result;
    }
}
