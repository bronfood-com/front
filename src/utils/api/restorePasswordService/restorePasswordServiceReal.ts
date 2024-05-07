import {
    RestorePasswordService,
    RequestChangePasswordResponse,
    RequestChangePasswordResponseError,
    CompleteChangePasswordResponse,
} from './restorePasswordService';
import { API_URL } from '../../consts';

export class RestorePasswordServiceReal implements RestorePasswordService {
    async queryPhoneNumber(
        phone: string
    ): Promise<
        RequestChangePasswordResponse | RequestChangePasswordResponseError
    > {
        const body = { phone };
        const res = await fetch(`${API_URL}/client/change_password/request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body),
        });
        const result = await res.json();
        return result;
    }

    async setNewPassword(
        password: string,
        password_confirm: string,
        temp_data_code: string
    ): Promise<
        RequestChangePasswordResponse | RequestChangePasswordResponseError
    > {
        const body = { password, password_confirm, temp_data_code };
        const res = await fetch(
            `${API_URL}/client/change_password/confirmation/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(body),
            }
        );
        const result = await res.json();
        return result;
    }

    async verifyPasswordChange(
        temp_data_code: string,
        confirmation_code: string
    ): Promise<
        CompleteChangePasswordResponse | RequestChangePasswordResponseError
    > {
        const body = { confirmation_code, temp_data_code };
        const res = await fetch(`${API_URL}/client/change_password/complete/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body),
        });
        const result = await res.json();
        return result;
    }
}
