import { RestorePasswordService, requestChangePasswordResponse, requestChangePasswordResponseError, completeChangePasswordResponse } from './restorePasswordService';

export class RestorePasswordServiceMock implements RestorePasswordService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    getPhoneNumber(phoneNumber: string) {
        return '' + phoneNumber;
    }

    generateTempDataCode(phoneNumber: string) {
        return `ok${phoneNumber[17]}kjh23a;bn%`;
    }

    async queryPhoneNumber(phone: string): Promise<requestChangePasswordResponse | requestChangePasswordResponseError> {
        await this._wait(500);
        const phoneNumber = this.getPhoneNumber(phone);
        const temp_data_code = this.generateTempDataCode(phone);
        if (phoneNumber && temp_data_code) {
            localStorage.setItem('temp_data_code', temp_data_code);
            return { status: 'success', data: { temp_data_code: `ok${phone}` } };
        } else {
            localStorage.setItem('error', 'phoneNumber or temp_data_code is empty');
            return { status: 'error', error_message: 'something goes wrong' };
        }
    }

    async setNewPassword(password: string, password_confirm: string, temp_data_code: string): Promise<requestChangePasswordResponse | requestChangePasswordResponseError> {
        await this._wait(500);
        if (password === password_confirm) {
            return { status: 'success', data: { temp_data_code } };
        } else {
            localStorage.setItem('error', "passwords don't match");
            return { status: 'error', error_message: 'something goes wrong' };
        }
    }

    async verifyPasswordChange(temp_data_code: string, confirmation_code: string): Promise<completeChangePasswordResponse | requestChangePasswordResponseError> {
        await this._wait(700);
        if (temp_data_code && confirmation_code) {
            return { status: 'success', message: 'Password updated' };
        } else {
            localStorage.setItem('error', 'confirmation_code or temp_data_code is empty');
            return { status: 'error', error_message: 'something goes wrong' };
        }
    }
}
