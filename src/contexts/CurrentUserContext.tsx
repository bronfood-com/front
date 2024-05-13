import { createContext, FC, useState, PropsWithChildren } from 'react';
import { authService, LoginData, RegisterData, UpdateUser, User, UserExtra } from '../utils/api/authService';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type CurrentUserContent = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: UseMutationResult<{ data: User }, Error, LoginData, unknown> | Record<string, never>;
    signUp: UseMutationResult<{ data: { temp_data_code: string } }, Error, RegisterData, unknown> | Record<string, never>;
    logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
    updateUser: UseMutationResult<{ data: { temp_data_code: string } }, Error, UpdateUser, unknown> | Record<string, never>;
    confirmSignUp: UseMutationResult<{ data: User }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    confirmUpdateUser: UseMutationResult<{ data: UserExtra }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
};

export const CurrentUserContext = createContext<CurrentUserContent>({
    currentUser: null,
    isLogin: false,
    signIn: {},
    signUp: {},
    logout: {},
    updateUser: {},
    confirmSignUp: {},
    confirmUpdateUser: {},
});

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const user = localStorage.getItem('user');
    const [currentUser, setCurrentUser] = useState<User | null>(user && JSON.parse(user));
    const [serverSMSCode, setServerSMSCode] = useState<string>('');
    const isLogin = !!currentUser;
    const signIn = useMutation({
        mutationFn: (variables: LoginData) => authService.login(variables),
        onSuccess: (res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setCurrentUser(res.data);
        },
        onError: () => {
            setCurrentUser(null);
        },
    });
    const signUp = useMutation({
        mutationFn: (variables: RegisterData) => authService.register(variables),
        onSuccess: (res) => setServerSMSCode(res.data.temp_data_code),
    });
    const confirmSignUp = useMutation({
        mutationFn: (variables: { confirmation_code: string }) => authService.confirmRegisterPhone({ temp_data_code: serverSMSCode, confirmation_code: variables.confirmation_code }),
        onSuccess: (res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setCurrentUser(res.data);
            setServerSMSCode('');
        },
        onError: () => {
            setCurrentUser(null);
        },
    });
    const updateUser = useMutation({
        mutationFn: (variables: UpdateUser) => authService.updateUser(variables),
    });
    const confirmUpdateUser = useMutation({
        mutationFn: (variables: { confirmation_code: string }) => authService.confirmUpdateUser({ confirmation_code: variables.confirmation_code }),
        onSuccess: (res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setCurrentUser(res.data);
        },
    });
    const logout = useMutation({
        mutationFn: () => authService.logOut(),
        onSuccess: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setCurrentUser(null);
        },
    });

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                isLogin,
                signIn,
                signUp,
                logout,
                updateUser,
                confirmSignUp,
                confirmUpdateUser,
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};
