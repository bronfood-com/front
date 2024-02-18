import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { User } from '../utils/api/auth';
import { mockAuthApi } from '../utils/api/mockAuth';

type CurrentUserContent = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: {
        mutation: (data: FieldValues) => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
    };
    signUp: {
        mutation: (data: FieldValues) => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
    };
    logout: {
        mutation: () => Promise<void>;
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
});

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [signInErrorMessage, setSignInErrorMessage] = useState<string | null>(null);
    const [signUpErrorMessage, setSignUpErrorMessage] = useState<string | null>(null);
    const [logoutErrorMessage, setLogoutErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        const res = await mockAuthApi.login({ phone, password });
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

    const signUp = async (data: FieldValues) => {
        setIsLoading(true);
        setSignUpErrorMessage(null);
        const { password, phone, name } = data;
        const res = await mockAuthApi.register({ fullname: name, phone: phone.replace(/\D/g, ''), password });
        if (res.status === 'error') {
            setSignUpErrorMessage(res.error_message);
            setCurrentUser(null);
            setIsLoading(false);
        } else {
            const result = await mockAuthApi.confirmRegisterPhone({ temp_data_code: res.data.temp_data_code, confirmation_code: '0000' });
            if (result.status === 'error') {
                setSignUpErrorMessage(result.error_message);
                setCurrentUser(null);
            } else {
                setCurrentUser(result.data);
                localStorage.setItem('user', JSON.stringify(result.data));
            }
        }
    };

    const logout = useCallback(async () => {
        setLogoutErrorMessage(null);
        if (currentUser) {
            setIsLoading(true);
            const res = await mockAuthApi.loguOut(currentUser.auth_token);
            if (res.status === 'success') {
                setCurrentUser(null);
                localStorage.removeItem('user');
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setLogoutErrorMessage(res.error_message);
            }
        } else {
            return;
        }
    }, [currentUser]);

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
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};
