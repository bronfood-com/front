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

/*
 temp_data_code: Temporary code that the server assign to the user in db during registration
 confirmation_code: 4-digit code that user shoud enter to confirm registration
 */
export interface СonfirmRegisterPhoneData {
    temp_data_code: string;
    confirmation_code: string;
}

export interface User {
    phone: PhoneNumber;
    fullname: string;
    role?: 'CLIENT';
}

export interface AuthService {
    login: ({ phone, password }: LoginData) => Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }>;

    register: ({ fullname, phone, password }: RegisterData) => Promise<{ status: 'success'; data: { temp_data_code: string } } | { status: 'error'; error_message: string }>;

    confirmRegisterPhone: ({ temp_data_code, confirmation_code }: СonfirmRegisterPhoneData) => Promise<{ status: 'success'; data: User } | { status: 'error'; error_message: string }>;

    logOut: () => void;
    getToken: () => string | null;
}

// export const authService = new AuthServiceReal();
export const authService = new AuthServiceMock();
