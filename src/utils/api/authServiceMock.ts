import { AuthService, UserExtra, ConfirmUpdateUser } from './authService';
import { User, LoginData, RegisterData, ConfirmRegisterPhoneData, UpdateUser } from './authService';

export class AuthServiceMock implements AuthService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    getToken() {
        return localStorage.getItem('token');
    }

    async login({ phone, password }: LoginData): Promise<{ data: User }> {
        await this._wait(500);
        if (phone && password) {
            localStorage.setItem('token', '23423434');
            return { data: { fullname: 'User', phone, role: 'CLIENT' } };
        } else {
            throw new Error('invalidCredentials');
        }
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ data: { temp_data_code: string } }> {
        await this._wait(500);
        if (phone && password && fullname) {
            return { data: { temp_data_code: '1111' } };
        } else {
            throw new Error('phoneNumberIsAlreadyUsed');
        }
    }

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: ConfirmRegisterPhoneData): Promise<{ data: User }> {
        await this._wait(500);
        if (temp_data_code && confirmation_code) {
            localStorage.setItem('token', '23423434');
            return { data: { phone: '74443332211', fullname: 'user registered' } };
        } else {
            throw new Error('phoneNumberIsAlreadyUsed');
        }
    }

    async updateUser({ fullname, phone }: UpdateUser): Promise<{ data: { temp_data_code: string } }> {
        await this._wait(500);
        if (phone && fullname) {
            return { data: { temp_data_code: '1111' } };
        } else {
            throw new Error('invalidCredentials');
        }
    }

    async confirmUpdateUser({ confirmation_code }: ConfirmUpdateUser): Promise<{ status: 'success'; data: UserExtra } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (confirmation_code) {
            return { status: 'success', data: { phone: '74449998877', fullname: 'user changed', auth_token: '23423434' } };
        } else {
            return { status: 'error', error_message: 'invalidValidation' };
        }
    }

    async logOut() {
        await this._wait(500);
        const token = this.getToken();
        if (token) {
            return;
        } else {
            throw new Error('serverError');
        }
    }
}
