interface LoginData {
    phone: string;
    password: string;
}

interface User {
    phone: string;
    name: string;
    isCatering: boolean;
}
class AuthApi {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async login({ phone, password }: LoginData): Promise<{ status: 'success' | 'error'; data?: User; message?: string }> {
        await this._wait(500);
        if (phone && password) {
            return { status: 'success', data: { name: 'User', phone: '111', isCatering: false } };
        } else {
            return { status: 'error', message: 'error' };
        }
    }

}

export const authApi = new AuthApi();
