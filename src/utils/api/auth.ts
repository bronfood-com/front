type PhoneNumber = string;

interface LoginData {
    phone: PhoneNumber;
    password: string;
}
interface RegisterData {
    phone: PhoneNumber;
    password: string;
    isOwner: boolean;
    name: string;
}

interface User {
    phone: PhoneNumber;
    name: string;
    isOwner: boolean;
}
class AuthApi {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async login({ phone, password }: LoginData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        await this._wait(500);
        if (phone && password) {
            return { status: 'success', data: { name: 'User', phone, isOwner: false } };
        } else {
            return { status: 'error', errorMessage: 'invalidCredentials' };
        }
    }

    async register({ name, phone, password, isOwner }: RegisterData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        await this._wait(500);
        if (phone && password && name) {
            return { status: 'success', data: { name: 'User', phone, isOwner } };
        } else {
            return { status: 'error', errorMessage: "phoneNumberIsAlreadyUsed" };
        }
    }

    async loguOut(): Promise<{ status: string }> {
        await this._wait(500);
        return { status: 'success' };
    }
}

export const authApi = new AuthApi();
