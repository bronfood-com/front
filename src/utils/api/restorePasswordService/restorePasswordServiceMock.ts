import { RestorePasswordService, RequestChangePasswordResponse, RequestChangePasswordResponseError, CompleteChangePasswordResponse } from './restorePasswordService';

export class RestorePasswordServiceMock implements RestorePasswordService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    private generateTempDataCode(phoneNumber: string) {
        return `ok${phoneNumber[5]}kjh23a;bn%`;
    }

    async queryPhoneNumber(phone: string): Promise<RequestChangePasswordResponse | RequestChangePasswordResponseError> {
        await this._wait(300);
        if (phone === '74444444444') {
            return { status: 'error', error_message: 'UserWithThatPhoneNotFound' };
        }
        return { status: 'success', data: { temp_data_code: `${this.generateTempDataCode(phone)}` } };
    }

    async setNewPassword(password: string, password_confirm: string, temp_data_code: string): Promise<RequestChangePasswordResponse | RequestChangePasswordResponseError> {
        await this._wait(300);
        if (password === 'error' && password_confirm === 'error') {
            return { status: 'error', error_message: 'ValidationError' };
        }
        return { status: 'success', data: { temp_data_code } };
    }

    async verifyPasswordChange(_temp_data_code: string, confirmation_code: string): Promise<CompleteChangePasswordResponse | RequestChangePasswordResponseError> {
        await this._wait(300);
        if (confirmation_code === '4444') {
            return { status: 'error', error_message: 'invalidConformationCode' };
        }
        return { status: 'success', message: 'Password updated' };
    }
}
