import { createContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { User, authApi } from '../utils/api/auth';

type CurrentUserContent = {
    currentUser: User | null | undefined;
    errorMessage: string | null;
    signIn: (data: FieldValues) => void;
    signUp: (data: FieldValues) => void;
    logout: () => void;
};
const CurrentUserContext = createContext<CurrentUserContent>({ currentUser: null, errorMessage: null, signIn: () => {}, signUp: () => {}, logout: () => {} });

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);

    const signIn = useCallback(async (data: FieldValues) => {
        const { password, phoneNumber } = data;
        setErrorMessage(null);
        const res = await authApi.login({ phone: phoneNumber, password });
        if (res.status === 'error') {
            setErrorMessage(res.errorMessage);
            setCurrentUser(null);
        } else {
            localStorage.setItem('user', JSON.stringify(res.data));
            setCurrentUser(res.data);
        }
    }, []);

    const signUp = useCallback(async (data: FieldValues) => {
        const { password, phoneNumber, name } = data;
        setErrorMessage(null);
        const res = await authApi.register({ name, phone: phoneNumber, password });
        if (res.status === 'error') {
            setErrorMessage(res.errorMessage);
            setCurrentUser(null);
        } else {
            setCurrentUser(res.data);
        }
    }, []);

    const logout = useCallback(async () => {
        setErrorMessage(null);
        const res = await authApi.loguOut();
        if (res.status === 'success') {
            setCurrentUser(null);
            localStorage.removeItem('user');
        } else {
            return;
        }
    }, []);

    return <CurrentUserContext.Provider value={{ currentUser, errorMessage, signIn, signUp, logout }}>{children}</CurrentUserContext.Provider>;
};
