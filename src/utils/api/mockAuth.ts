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

class MockAuthApi {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async login({ phone, password }: LoginData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (phone && password) {
            return { status: 'success', data: { fullname: 'User', phone, auth_token: '84762854', role: 'CLIENT' } };
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

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: confirmRegisterPhoneData): Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        if (temp_data_code && confirmation_code) {
            return { status: 'success', data: { phone: '777777777', fullname: 'Юзверь', auth_token: 'dfjhgg74wf' } };
        } else {
            return { status: 'error', error_message: 'phoneNumberIsAlreadyUsed' };
        }
    }

    async loguOut(token: string): Promise<{ status: string; error_message: string } | { status: string }> {
        await this._wait(500);
        if (token) {
            return { status: 'success' };
        }
        return { status: 'error', error_message: 'noUser' };
    }
}

export const mockAuthApi = new MockAuthApi();
