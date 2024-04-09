import { AuthService } from './authService';
import { User, LoginData, RegisterData, СonfirmRegisterPhoneData, UpdateUser } from './authService';

export class AuthServiceMock implements AuthService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    getToken() {
        return localStorage.getItem('token');
    }

    async login({ phone, password }: LoginData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (phone && password) {
            localStorage.setItem('token', '23423434');
            return { status: 'success', data: { fullname: 'User', phone, role: 'CLIENT' } };
        } else {
            return { status: 'error', error_message: 'invalidCredentials' };
        }
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ status: 'success'; data: { temp_data_code: string } } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (phone && password && fullname) {
            return { status: 'success', data: { temp_data_code: '1111' } };
        } else {
            return { status: 'error', error_message: 'phoneNumberIsAlreadyUsed' };
        }
    }

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: СonfirmRegisterPhoneData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (temp_data_code && confirmation_code) {
            localStorage.setItem('token', '23423434');
            return { status: 'success', data: { phone: '777777777', fullname: 'Юзверь' } };
        } else {
            return { status: 'error', error_message: 'phoneNumberIsAlreadyUsed' };
        }
    }

    async logOut() {
        await this._wait(500);
        const token = this.getToken();
        if (token) {
            localStorage.removeItem('token');
        }
    }

    async updateUser({ fullname, phone }: UpdateUser): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (phone && fullname) {
            return {
                status: 'success',
                data: { fullname: 'User', phone, role: 'CLIENT' },
            };
        } else {
            return { status: 'error', error_message: 'invalidCredentials' };
        }
    }
}
