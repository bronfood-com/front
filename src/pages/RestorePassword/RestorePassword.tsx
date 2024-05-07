import NewPassword from './NewPassword/NewPassword';
import SMSVerify from './SMSVerify/SMSVerify';
import SuccessPasswordChange from './SuccessPasswordChange/SuccessPasswordChange';
import QueryPhone from './QueryPhone/QueryPhone';
import { restorePasswordService } from '../../utils/api/restorePasswordService/restorePasswordService';
import { useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';

type TypeStage = 'START' | 'PHONE-EXIST' | 'NEW-PASSWORD-GIVEN' | 'SUCCESS';

const RestorePassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stage, setStage] = useState<TypeStage>('START');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [tempDataCode, setTempDataCode] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const makeLowerCaseFirstLetter = (str: string) => {
        return str[0].toLowerCase() + str.slice(1);
    };

    const clearError = () => {
        setIsError(false);
        setErrorMessage('');
    };

    const onSubmitQueryPhone = async (phoneNumber: string) => {
        setIsLoading(true);
        const res = await restorePasswordService.queryPhoneNumber(phoneNumber);
        if (res.status === 'success') {
            clearError();
            setIsLoading(false);
            setTempDataCode(res.data.temp_data_code);
            setStage('PHONE-EXIST');
        } else if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(makeLowerCaseFirstLetter(res.error_message));
            setIsError(true);
        }
    };

    const onSubmitChangePassword = async (password: string, password_confirm: string) => {
        setIsLoading(true);
        const res = await restorePasswordService.setNewPassword(password, password_confirm, tempDataCode);
        if (res.status === 'success') {
            clearError();
            setIsLoading(false);
            setTempDataCode(res.data.temp_data_code);
            setStage('NEW-PASSWORD-GIVEN');
        } else if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(makeLowerCaseFirstLetter(res.error_message));
            setIsError(true);
        }
    };

    const onSubmitApplyPassword = async (code: string) => {
        setIsLoading(true);
        const res = await restorePasswordService.verifyPasswordChange(tempDataCode, code);
        if (res.status === 'success') {
            clearError();
            setIsLoading(false);
            setStage('SUCCESS');
            localStorage.removeItem('phone');
        } else if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(makeLowerCaseFirstLetter(res.error_message));
            setIsError(true);
        }
    };

    const renderStage = () => {
        switch (stage) {
            case 'START':
                return <QueryPhone isErrorVisible={isError} error={errorMessage} onSubmit={onSubmitQueryPhone} />;

            case 'PHONE-EXIST':
                return <NewPassword isErrorVisible={isError} error={errorMessage} onSubmit={onSubmitChangePassword} />;

            case 'NEW-PASSWORD-GIVEN':
                return <SMSVerify isErrorVisible={isError} error={errorMessage} onSubmit={onSubmitApplyPassword} />;

            case 'SUCCESS':
                return <SuccessPasswordChange />;
        }
    };

    return <>{isLoading ? <Preloader /> : renderStage()}; </>;
};

export default RestorePassword;
