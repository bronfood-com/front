import { AuthService, UserExtra, СonfirmUpdateUser } from './authService';
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
            return { status: 'success', data: { userId: 'u12345', fullname: 'User', phone, role: 'CLIENT' } };
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
            return { status: 'success', data: { userId: 'u67890', phone: '74443332211', fullname: 'user registred' } };
        } else {
            return { status: 'error', error_message: 'phoneNumberIsAlreadyUsed' };
        }
    }

    async updateUser({ fullname, phone }: UpdateUser): Promise<{ status: 'success'; data: { temp_data_code: string } } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (phone && fullname) {
            return {
                status: 'success',
                data: { temp_data_code: '1111' },
            };
        } else {
            return { status: 'error', error_message: 'invalidCredentials' };
        }
    }

    async confirmUpdateUser({ confirmation_code }: СonfirmUpdateUser): Promise<{ status: 'success'; data: UserExtra } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (confirmation_code) {
            return { status: 'success', data: { userId: 'u56789', phone: '74449998877', fullname: 'user changed', auth_token: '23423434' } };
        } else {
            return { status: 'error', error_message: 'invalidValidation' };
        }
    }

    async logOut() {
        await this._wait(500);
        const token = this.getToken();
        if (token) {
            localStorage.removeItem('token');
        }
    }
}
