type Data = {
    phone?: string;
    name?: string;
    password?: string;
    isCatering: boolean;
};

class AuthApi {
    async login({ phone, password }: Data): Promise<{ status: string; data?: string; message?: string }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (phone && password) {
                    resolve({ status: 'success', data: 'data' });
                } else {
                    resolve({ status: 'error', message: 'error' });
                }
            }, 500);
        });
    }

    async register({ name, phone, password, isCatering }: Data): Promise<{ status: string; data?: string; message?: string }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (name && phone && password && isCatering) {
                    resolve({ status: 'success', data: 'data' });
                } else {
                    resolve({ status: 'error', message: 'error' });
                }
            }, 500);
        });
    }

    async loguOut(): Promise<{ status: string }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: 'success' });
            }, 500);
        });
    }

    async getUser(): Promise<{ user: string }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ user: 'success' });
            }, 500);
        });
    }

    async updateUser({ name, phone, password }: Data): Promise<{ status: string; data?: string; message?: string }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (name && phone && password) {
                    resolve({ status: 'success' });
                } else {
                    resolve({ status: 'error', message: 'error' });
                }
            }, 500);
        });
    }
}

export const authApi = new AuthApi();
