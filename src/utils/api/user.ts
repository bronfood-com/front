type PhoneNumber = string;

interface LoginData {
    password: string;
    confirmPassword: string;
}

interface User {
    phone: PhoneNumber;
    name: string;
    isOwner: boolean;
}

class UserApi {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async editPassword({ password, confirmPassword }: LoginData): Promise<{ status: 'success' | 'error'; data?: User; errorMessage?: string }> {
        await this._wait(500);
        if (confirmPassword && password) {
            return { status: 'success', data: { name: 'User', phone: '+7 999 99 99 99', isOwner: false } };
        } else {
            return { status: 'error', errorMessage: 'invalidCredentials' };
        }
    }
}

export const userApi = new UserApi();
