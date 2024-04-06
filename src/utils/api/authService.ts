import { AuthServiceMock } from './authServiceMock';
// import { AuthServiceReal } from './authServiceReal';

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
    password: string;
    confirmPassword: string;
}
/*
 temp_data_code: Temporary code that the server assign to the user in db during registration
 confirmation_code: 4-digit code that user shoud enter to confirm registration
 */
export interface СonfirmRegisterPhoneData {
    temp_data_code: string;
    confirmation_code: string;
}

export interface СonfirmUpdateUser {
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
    login: ({ phone, password }: LoginData) => Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }>;

    register: ({ fullname, phone, password }: RegisterData) => Promise<{ status: 'success'; data: { temp_data_code: string } } | { status: 'error'; error_message: string }>;

    confirmRegisterPhone: ({ temp_data_code, confirmation_code }: СonfirmRegisterPhoneData) => Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }>;

    updateUser: ({ fullname, phone, password, confirmPassword }: UpdateUser) => Promise<{ status: 'success'; data: { temp_data_code: string } } | { status: 'error'; error_message: string }>;

    confirmUpdateUser: ({ confirmation_code }: СonfirmUpdateUser) => Promise<{ status: 'success'; data: UserExtra } | { status: 'error'; error_message: string }>;

    logOut: () => Promise<void>;
}

export const authService = new AuthServiceMock();
// export const authService = new AuthServiceReal();
