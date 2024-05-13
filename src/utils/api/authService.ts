// import { AuthServiceMock } from './authServiceMock';
import { AuthServiceReal } from './authServiceReal';

/**
 11 digits string, no space, brackets, or +
 */
export type PhoneNumber = string;

export interface LoginData {
    phone: PhoneNumber;
    password: string;
}
export interface RegisterData {
    phone: PhoneNumber;
    password: string;
    fullname: string;
}
export interface UpdateUser {
    fullname: string;
    phone: PhoneNumber;
    password?: string;
    confirmPassword?: string;
}
/*
 temp_data_code: Temporary code that the server assign to the user in db during registration
 confirmation_code: 4-digit code that user shoud enter to confirm registration
 */
export interface ConfirmRegisterPhoneData {
    temp_data_code: string;
    confirmation_code: string;
}

export interface ConfirmUpdateUser {
    confirmation_code: string;
}
export interface User {
    phone: PhoneNumber;
    fullname: string;
    role?: 'CLIENT';
}
export interface UserExtra {
    phone: PhoneNumber;
    fullname: string;
    role?: 'CLIENT';
    auth_token: string;
}
export interface AuthService {
    login: ({ phone, password }: LoginData) => Promise<{ data: User }>;

    register: ({ fullname, phone, password }: RegisterData) => Promise<{ data: { temp_data_code: string } }>;

    confirmRegisterPhone: ({ temp_data_code, confirmation_code }: ConfirmRegisterPhoneData) => Promise<{ data: User }>;

    updateUser: ({ fullname, phone, password, confirmPassword }: UpdateUser) => Promise<{ data: { temp_data_code: string } }>;

    confirmUpdateUser: ({ confirmation_code }: ConfirmUpdateUser) => Promise<{ data: UserExtra }>;

    logOut: () => Promise<void>;
}

// export const authService = new AuthServiceMock();
export const authService = new AuthServiceReal();
