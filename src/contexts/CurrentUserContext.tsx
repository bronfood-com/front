import { createContext, useContext, FC, useState, PropsWithChildren, useCallback, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { User, authApi } from '../utils/api/auth';
import { useLocalStorage } from '../hooks/useLocalstorage';
type CurrentUserContent = {
    currentUser: User | null | undefined;
    errorMessage: string | null;
    signIn: (data: FieldValues) => void;
    signUp: (data: FieldValues) => void;
};
const CurrentUserContext = createContext<CurrentUserContent>({ currentUser: null, errorMessage: null, signIn: () => {}, signUp: () => {} });

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { getItem, setItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);

    const signIn = useCallback(async (data: FieldValues) => {
        const { password, phoneNumber } = data;
        setErrorMessage(null);
        const res = await authApi.login({ phone: phoneNumber, password });
        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
            setCurrentUser(null);
        } else {
            setItem('user', JSON.stringify(res.data));
            setCurrentUser(res.data);
        }
    }, []);

    const signUp = useCallback(async (data: FieldValues) => {
        const { password, phoneNumber, name } = data;
        setErrorMessage(null);
        const res = await authApi.register({ name, phone: phoneNumber, password });
        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
            setCurrentUser(null);
        } else {
            setCurrentUser(res.data);
        }
    }, []);

    return <CurrentUserContext.Provider value={{ currentUser, errorMessage, signIn, signUp }}>{children}</CurrentUserContext.Provider>;
};
