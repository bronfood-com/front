import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { User, authApi } from '../utils/api/auth';

type CurrentUserContent = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: {
        mutation: (data: FieldValues) => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
        clearErrorMessage: () => void;
    };
    signUp: {
        mutation: (data: FieldValues) => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
        clearErrorMessage: () => void;
    };
    logout: {
        mutation: () => Promise<void>;
        isLoading: boolean;
        errorMessage: string | null;
        clearErrorMessage: () => void;
    };
};

export const CurrentUserContext = createContext<CurrentUserContent>({
    currentUser: null,
    isLogin: false,
    signIn: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
        clearErrorMessage: () => {},
    },
    signUp: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
        clearErrorMessage: () => {},
    },
    logout: {
        mutation: () => Promise.resolve(),
        isLoading: false,
        errorMessage: null,
        clearErrorMessage: () => {},
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

    const clearSignInErrorMessage = () => setSignInErrorMessage(null);
    const clearSignUpErrorMessage = () => setSignUpErrorMessage(null);
    const clearLogoutErrorMessage = () => setLogoutErrorMessage(null);

    const signIn = useCallback(async (data: FieldValues) => {
        setIsLoading(true);
        setSignInErrorMessage(null);
        const { password, phone } = data;
        const res = await authApi.login({ phone, password });
        if (res.status === 'error') {
            setSignInErrorMessage(res.errorMessage);
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
        const res = await authApi.register({ name, phone, password });
        if (res.status === 'error') {
            setSignUpErrorMessage(res.errorMessage);
            setCurrentUser(null);
            setIsLoading(false);
        } else {
            localStorage.setItem('user', JSON.stringify(res.data));
            setCurrentUser(res.data);
            setIsLoading(false);
        }
    };

    const logout = useCallback(async () => {
        setLogoutErrorMessage(null);
        setIsLoading(true);
        const res = await authApi.logout();
        if (res.status === 'success') {
            setCurrentUser(null);
            localStorage.removeItem('user');
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setLogoutErrorMessage(res.errorMessage);
        }
    }, []);

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                isLogin,
                signIn: {
                    mutation: signIn,
                    isLoading,
                    errorMessage: signInErrorMessage,
                    clearErrorMessage: clearSignInErrorMessage,
                },
                signUp: {
                    mutation: signUp,
                    isLoading,
                    errorMessage: signUpErrorMessage,
                    clearErrorMessage: clearSignUpErrorMessage,
                },
                logout: {
                    mutation: logout,
                    isLoading,
                    errorMessage: logoutErrorMessage,
                    clearErrorMessage: clearLogoutErrorMessage,
                },
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};
