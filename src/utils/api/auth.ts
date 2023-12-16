/**
 * Phone number. Begins with '+' followed by 11 or more digits. Must not contain spaces or parentheses (или как вы договоритесь с бэками о формате)
 */
type PhoneNumber = string;

interface LoginData {
    phone: PhoneNumber;
    password: string;
}

interface User {
    phone: string;
    name: string;
}
class AuthApi {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async login({ phone, password }: LoginData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        await this._wait(500);
        if (phone && password) {
            return { status: 'success', data: { name: 'User', phone: phone} };
        } else {
            return { status: 'error', errorMessage: 'error' };
        }
    }
}

export const authApi = new AuthApi();
