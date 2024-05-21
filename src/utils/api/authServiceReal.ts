import { AuthService, ConfirmUpdateUser, User, LoginData, RegisterData, ConfirmRegisterPhoneData, UpdateUser, UserExtra } from './authService';
import { API_URL } from '../consts';

export class AuthServiceReal implements AuthService {
    /* contracts https://www.notion.so/Api-Auth-b7317228f7134259a5089a7d05e79bb2 */

    getToken() {
        return localStorage.getItem('token');
    }

    async login({ phone, password }: LoginData): Promise<{ data: User }> {
        const res = await fetch(`${API_URL}/signin/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ phone, password }),
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error_message);
        } else {
            const { auth_token } = result.data;
            localStorage.setItem('token', auth_token);
            delete result.data.auth_token;
            return result;
        }
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ data: { temp_data_code: string } }> {
        const res = await fetch(`${API_URL}/client/request_to_signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ phone, password, fullname }),
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error_message);
        } else {
            return result;
        }
    }

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: ConfirmRegisterPhoneData): Promise<{ data: User }> {
        const res = await fetch(`${API_URL}/client/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ temp_data_code, confirmation_code }),
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error_message);
        } else {
            const { auth_token } = result.data;
            localStorage.setItem('token', auth_token);
            delete result.data.auth_token;
            return result;
        }
    }

    async updateUser({ fullname, phone, password, confirmPassword }: UpdateUser): Promise<{ data: { temp_data_code: string } }> {
        const token = this.getToken();
        let requestData: UpdateUser = { fullname, phone };
        if (password && confirmPassword) {
            requestData = { ...requestData, password, confirmPassword };
        }
        const res = await fetch(`${API_URL}/client/profile/update_request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Token ${token}`,
            },
            body: JSON.stringify(requestData),
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error_message);
        } else {
            return result;
        }
    }

    async confirmUpdateUser({ confirmation_code }: ConfirmUpdateUser): Promise<{ data: UserExtra }> {
        const res = await fetch(`${API_URL}/client/profile/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ confirmation_code }),
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error_message);
        } else {
            delete result.data.auth_token;
            delete result.data.role;
            return result;
        }
    }

    async logOut() {
        const token = this.getToken();
        const clearLocalStorage = () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        };
        const res = await fetch(`${API_URL}/client/signout/`, {
            method: 'POST',
            headers: {
                authorization: `Token ${token}`,
            },
        });
        if (!res.ok) {
            clearLocalStorage();
            throw new Error(res.statusText);
        } else {
            clearLocalStorage();
            return;
        }
    }
}
