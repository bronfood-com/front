import { createContext, FC, useState, PropsWithChildren } from 'react';
import { authService, LoginData, RegisterData, UpdateUser, User, UserExtra } from '../utils/api/authService';
import { useTranslation } from 'react-i18next';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type CurrentUserContent = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: UseMutationResult<{ data: User }, Error, LoginData, unknown> | Record<string, never>;
    signUp: UseMutationResult<{ data: { temp_data_code: string } }, Error, RegisterData, unknown> | Record<string, never>;
    logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
    updateUser: UseMutationResult<{ data: { temp_data_code: string } }, Error, UpdateUser, unknown> | Record<string, never>;
    confirmSignUp: UseMutationResult<{ data: User }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    confirmUpdateUser: {
        mutation: (data: string) => Promise<UserExtra | null>;
        isLoading: boolean;
        errorMessage: string | undefined;
    };
};

export const CurrentUserContext = createContext<CurrentUserContent>({
    currentUser: null,
    isLogin: false,
    signIn: {},
    signUp: {},
    logout: {},
    updateUser: {},
    confirmSignUp: {},
    confirmUpdateUser: {
        mutation: () => Promise.resolve<UserExtra | null>(null),
        isLoading: false,
        errorMessage: '',
    },
});

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const user = localStorage.getItem('user');
    const [currentUser, setCurrentUser] = useState<User | null>(user && JSON.parse(user));
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverSMSCode, setServerSMSCode] = useState<string>('');
    const [confirmErrorMessage, setConfirmErrorMessage] = useState<string>('');
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
    /* const updateUser = async (data: FieldValues) => {
        setIsLoading(true);
        setUpdateUserErrorMessage(null);
        const { phone, fullname, password, confirmPassword } = data;
        const res = await authService.updateUser({ phone: phone, fullname: fullname, password: password, confirmPassword: confirmPassword });
        if (res.status === 'error') {
            if (res.error_message === 'ValidationError') {
                setUpdateUserErrorMessage(t(`pages.error.validation`));
            } else if (res.error_message === 'Duplicate') {
                setUpdateUserErrorMessage(t(`pages.error.duplicate`));
            } else {
                setUpdateUserErrorMessage(t(`pages.error.server`));
            }
            setIsLoading(false);
            return null;
        } else {
            setIsLoading(false);
            return res.data.temp_data_code;
        }
    }; */

    const confirmUpdateUser = async (enteredCode: string) => {
        setIsLoading(true);
        const result = await authService.confirmUpdateUser({ confirmation_code: enteredCode });
        if (result.status === 'error') {
            if (result.error_message === 'ValidationError') {
                setConfirmErrorMessage(t(`pages.error.validation`));
            } else {
                setConfirmErrorMessage(t(`pages.error.server`));
            }
            setIsLoading(false);
            return null;
        } else {
            const user = { phone: result.data.phone, fullname: result.data.fullname };
            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            setIsLoading(false);
            return result.data;
        }
    };

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
                confirmUpdateUser: {
                    mutation: confirmUpdateUser,
                    isLoading,
                    errorMessage: confirmErrorMessage,
                },
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};
