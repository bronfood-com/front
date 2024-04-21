import { RestorePasswordServiceMock } from './restorePasswordServiceMock';
// import { RestorePasswordServiceReal } from './restorePasswordServiceReal';

export type restorePassword = {
    /**
     * user's phone number
     */
    phoneNumber: string;
};

export type newPassword = {
    /**
     * user's phone number
     */
    phoneNumber: string;
    /**
     * new password
     */
    newPassword: string;
    /**
     * code to verify user is owner of the phone number
     */
    verificationСode: string;
};

export type requestChangePasswordResponse = {
    status: 'success';
    data: {
        temp_data_code: string;
    };
};

export type requestChangePasswordResponseError = {
    status: 'error';
    error_message: string;
};

export type completeChangePasswordResponse = {
    status: 'success';
    message: string;
};

export interface RestorePasswordService {
    queryPhoneNumber: (phone: string) => Promise<requestChangePasswordResponse | requestChangePasswordResponseError>;
    setNewPassword: (phone: string, newPassword: string, verificationCode: string) => Promise<requestChangePasswordResponse | requestChangePasswordResponseError>;
    verifyPasswordChange: (temp_data_code: string, confirmation_code: string) => Promise<completeChangePasswordResponse | requestChangePasswordResponseError>;
}

// export const restorePasswordService = new RestorePasswordServiceReal();
export const restorePasswordService = new RestorePasswordServiceMock();
