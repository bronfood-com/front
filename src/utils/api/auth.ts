type PhoneNumber = string;

interface LoginData {
    phone: PhoneNumber;
    password: string;
}
interface RegisterData {
    phone: PhoneNumber;
    password: string;
    name: string;
}

export interface User {
    phone: PhoneNumber;
    name: string;
    isOwner?: boolean;
}
class AuthApi {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async login({ phone, password }: LoginData): Promise<{ status: 'success'; data: User } | { status: 'error'; errorMessage: string }> {
        await this._wait(500);
        if (phone && password) {
            return { status: 'success', data: { name: 'User', phone, isOwner: false } };
        } else {
            return { status: 'error', errorMessage: 'invalidCredentials' };
        }
    }

    async register({ name, phone, password }: RegisterData): Promise<{ status: 'success'; data: User } | { status: 'error'; errorMessage: string }> {
        await this._wait(500);
        if (phone && password && name) {
            return { status: 'success', data: { name: name, phone } };
        } else {
            return { status: 'error', errorMessage: 'phoneNumberIsAlreadyUsed' };
        }
    }

    async loguOut(): Promise<{ status: 'success' } | { status: 'error'; errorMessage: string }> {
        await this._wait(500);
        const success = true;
        if (success) {
            return { status: 'success' };
        } else {
            return { status: 'error', errorMessage: 'serverError' };
        }
    }
}

export const authApi = new AuthApi();
