import { PropsWithChildren, createContext, FC, useState } from 'react';
import { restorePasswordService } from '../utils/api/restorePasswordService/restorePasswordService';

type TypeStage = 'START' | 'PHONE-EXIST' | 'NEW-PASSWORD-GIVEN' | 'SUCCESS' | 'ERROR';

type TypeRestorePasswordContext = {
    /**
     * Indicates whether request are loading
     */
    isLoading: boolean;
    /**
     * stage of the restore password process
     */
    stage: TypeStage;
    /**
     * function controls query phone number stage
     */
    queryPhone: (phoneNumber: string) => void;
    /**
     * function controls new password stage
     */
    requestChangePassword: (password: string, password_confirm: string) => void;
    /**
     * function controls confirmation code stage
     */
    applyPasswordChange: () => void;
    /**
     * function that reset local variables for restore password feature
     */
    startRestorePassword: () => void;
};

export const RestorePasswordContext = createContext<TypeRestorePasswordContext>({
    isLoading: false,
    stage: 'START',
    queryPhone: () => {},
    requestChangePassword: () => {},
    applyPasswordChange: () => {},
    startRestorePassword: () => {},
});

export const RestorePasswordProvider: FC<PropsWithChildren> = ({ children }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stage, setStage] = useState<TypeStage>('START');

    const queryPhone = async (phoneNumber: string) => {
        setIsLoading(true);
        const res = await restorePasswordService.queryPhoneNumber(phoneNumber);
        if (res.status === 'error') {
            setIsLoading(false);
            setStage('ERROR');
        }
        if (res.status === 'success') {
            setIsLoading(false);
            setStage('PHONE-EXIST');
        }
    };

    const requestChangePassword = async (password: string, password_confirm: string) => {
        setIsLoading(true);
        const temp_data_code = localStorage.getItem('temp_data_code');
        if (temp_data_code && temp_data_code !== '') {
            const res = await restorePasswordService.setNewPassword(password, password_confirm, temp_data_code);
            if (res.status === 'error') {
                setIsLoading(false);
                setStage('ERROR');
            }
            if (res.status === 'success') {
                setIsLoading(false);
                setStage('NEW-PASSWORD-GIVEN');
                return;
            }
        }
        setIsLoading(false);
        setStage('ERROR');
    };

    const applyPasswordChange = async () => {
        setIsLoading(true);
        const temp_data_code = localStorage.getItem('temp_data_code');
        const confirmation_code = localStorage.getItem('confirmation_code');
        if ((temp_data_code && temp_data_code !== '')&&(confirmation_code && confirmation_code !== '')) {
            const res = await restorePasswordService.verifyPasswordChange(temp_data_code, confirmation_code);
            if (res.status === 'error') {
                setIsLoading(false);
                setStage('ERROR');
            }
            if (res.status === 'success') {
                setIsLoading(false);
                setStage('SUCCESS');
            }
        }
        setTimeout(() => {
            setStage('START');
        }, 3000);
    };

    const startRestorePassword = () => {
        localStorage.removeItem('error');
        localStorage.removeItem('temp_data_code');
        localStorage.removeItem('confirmation_code');
        setStage('START');
    };

    return (
        <RestorePasswordContext.Provider
            value={{
                isLoading: isLoading,
                stage: stage,
                queryPhone,
                requestChangePassword,
                applyPasswordChange,
                startRestorePassword,
            }}
        >
            {children}
        </RestorePasswordContext.Provider>
    );
};
