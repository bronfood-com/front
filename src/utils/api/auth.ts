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
    isOwner: boolean;
    fullname: string;
}
interface confirmRegisterPhoneData {
    temp_data_code: string;
    confirmation_code: string;
}
interface EditPasswordData {
    password: string;
    confirmPassword: string;
}
export interface User {
    phone: PhoneNumber;
    name: string;
    isOwner?: boolean;
}
class AuthApi {
    async login({ phone, password }: LoginData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        const res = await fetch(`${API_URL}/client/request_to_signup/`, { method: 'POST', body: JSON.stringify({ phone, password }) });
        const result = await res.json();
        return result;
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        const res = await fetch(`${API_URL}/client/request_to_signup/`, { method: 'POST', body: JSON.stringify({ phone, password, fullname }) });
        const result = await res.json();
        return result;
    }

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: confirmRegisterPhoneData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        const res = await fetch(`${API_URL}/client/request_to_signup/`, { method: 'POST', body: JSON.stringify({ temp_data_code, confirmation_code }) });
        const result = await res.json();
        return result;
    }

    async loguOut(): Promise<{ status: string }> {
        return { status: 'success' };
    }

    async editPassword({ password, confirmPassword }: EditPasswordData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        if (confirmPassword && password) {
            return { status: 'success', data: { fullname: 'User', phone: '+7 999 99 99 99', isOwner: false } };
        } else {
            return { status: 'error', errorMessage: 'invalidCredentials' };
        }
    }
}

export const authApi = new AuthApi();
