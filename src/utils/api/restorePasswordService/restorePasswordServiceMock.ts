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
        return { status: 'success', data: { temp_data_code: `${this.generateTempDataCode(phone)}` } };
    }

    async setNewPassword(password: string, password_confirm: string, temp_data_code: string): Promise<RequestChangePasswordResponse | RequestChangePasswordResponseError> {
        await this._wait(300);
        return { status: 'success', data: { temp_data_code } };
    }

    async verifyPasswordChange(temp_data_code: string, confirmation_code: string): Promise<CompleteChangePasswordResponse | RequestChangePasswordResponseError> {
        await this._wait(300);
        if (temp_data_code === '' || confirmation_code === '') {
            return { status: 'error', error_message: 'temp_data_code or confirmation_code is empty' };
        }
        return { status: 'success', message: 'Password updated' };
    }
}
