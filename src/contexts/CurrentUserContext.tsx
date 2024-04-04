import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { authService, User } from '../utils/api/authService';
import { useTranslation } from 'react-i18next';

type CurrentUserContent = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: {
        mutation: (data: FieldValues) => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
    };
    signUp: {
        mutation: (data: FieldValues) => Promise<void | string | undefined>;
        isLoading: boolean;
        errorMessage: string | null;
    };
    logout: {
        mutation: () => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
    };
    updateUser: {
        mutation: (data: FieldValues) => Promise<void | string | undefined>;
        isLoading: boolean;
        errorMessage: string | null;
    };
    confirmSignUp: {
        mutation: (data: string) => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
    };
    confirmUpdateUser: {
        mutation: (data: string) => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
    };
};

export const CurrentUserContext = createContext<CurrentUserContent>({
    currentUser: null,
    isLogin: false,
    signIn: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
    },
    signUp: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
    },
    logout: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
    },
    updateUser: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
    },
    confirmSignUp: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
    },
    confirmUpdateUser: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
    },
});

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const { t } = useTranslation();
    const [signInErrorMessage, setSignInErrorMessage] = useState<string | null>(null);
    const [signUpErrorMessage, setSignUpErrorMessage] = useState<string | null>(null);
    const [logoutErrorMessage, setLogoutErrorMessage] = useState<string | null>(null);
    const [updateUserErrorMessage, setUpdateUserErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [serverSMSCode, setServerSMSCode] = useState<string>('');
    const [confirmErrorMessage, setConfirmErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);

    const isLogin = !!currentUser;

    const signIn = useCallback(async (data: FieldValues) => {
        setIsLoading(true);
        setSignInErrorMessage(null);
        const { password, phone } = data;
        const res = await authService.login({ phone: phone.replace(/\D/g, ''), password });
        if (res.status === 'error') {
            setSignInErrorMessage(res.error_message);
            setCurrentUser(null);
            setIsLoading(false);
        } else {
            localStorage.setItem('user', JSON.stringify(res.data));
            setCurrentUser(res.data);
            setIsLoading(false);
        }
    }, []);

    const confirmSignUp = async (enteredCode: string) => {
        setIsLoading(true);
        const result = await authService.confirmRegisterPhone({ temp_data_code: serverSMSCode, confirmation_code: enteredCode });
        if (result.status === 'error') {
            setConfirmErrorMessage(result.error_message);
            setCurrentUser(null);
            setIsLoading(false);
        } else {
            setCurrentUser(result.data);
            localStorage.setItem('user', JSON.stringify(result.data));
            setIsLoading(false);
            setServerSMSCode('');
        }
    };

    const signUp = async (data: FieldValues) => {
        setIsLoading(true);
        setSignUpErrorMessage(null);
        const { password, phone, name } = data;
        const res = await authService.register({ fullname: name, phone: phone.replace(/\D/g, ''), password });
        if (res.status === 'error') {
            setUpdateUserErrorMessage(res.error_message);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setServerSMSCode(res.data.temp_data_code);
            return res.data.temp_data_code;
        }
    };

    const logout = useCallback(async () => {
        setLogoutErrorMessage(null);
        setIsLoading(true);
        if (currentUser) {
            await authService.logOut();
            setCurrentUser(null);
            localStorage.removeItem('user');
            setIsLoading(false);
        } else {
            return;
        }
    }, [currentUser]);

    const confirmUpdateUser = async (enteredCode: string) => {
        setIsLoading(true);
        const result = await authService.confirmUpdateUser({ confirmation_code: enteredCode });
        if (result.status === 'error') {
            setConfirmErrorMessage(result.error_message);
            setIsLoading(false);
        } else {
            setCurrentUser(result.data);
            localStorage.setItem('user', JSON.stringify(result.data));
            setIsLoading(false);
            setServerSMSCode('');
        }
    };

    const updateUser = async (data: FieldValues) => {
        setIsLoading(true);
        setUpdateUserErrorMessage(null);
        const { phone, fullname } = data;
        const res = await authService.updateUser({ phone: phone, fullname: fullname });
        if (res.status === 'error') {
            if (res.error_message === 'ValidationError') {
                setUpdateUserErrorMessage(t(`pages.error.validation`));
            } else if (res.error_message === 'Duplicate') {
                setUpdateUserErrorMessage(t(`pages.error.duplicate`));
            } else {
                setUpdateUserErrorMessage(t(`pages.error.server`));
            }
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setServerSMSCode(res.data.temp_data_code);
            return res.data.temp_data_code;
        }
    };

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                isLogin,
                signIn: {
                    mutation: signIn,
                    isLoading,
                    errorMessage: signInErrorMessage,
                },
                signUp: {
                    mutation: signUp,
                    isLoading,
                    errorMessage: signUpErrorMessage,
                },
                logout: {
                    mutation: logout,
                    isLoading,
                    errorMessage: logoutErrorMessage,
                },
                updateUser: {
                    mutation: updateUser,
                    isLoading,
                    errorMessage: updateUserErrorMessage,
                },
                confirmSignUp: {
                    mutation: confirmSignUp,
                    isLoading,
                    errorMessage: confirmErrorMessage,

                },
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
