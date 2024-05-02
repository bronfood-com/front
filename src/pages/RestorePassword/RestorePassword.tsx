import NewPassword from './NewPassword/NewPassword';
import Popup from '../../components/Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SMSVerify from '../../components/SMSVerify/SMSVerify';
import SuccessPasswordChange from './SuccessPasswordChange/SuccessPasswordChange';
import QueryPhone from './QueryPhone/QueryPhone';
import { restorePasswordService } from '../../utils/api/restorePasswordService/restorePasswordService';
import { useState } from 'react';

type TypeStage = 'START' | 'PHONE-EXIST' | 'NEW-PASSWORD-GIVEN' | 'SUCCESS' | 'ERROR';

const RestorePassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stage, setStage] = useState<TypeStage>('START');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [tempDataCode, setTempDataCode] = useState<string>('');

    const startRestorePassword = () => {
        setIsLoading(false);
        setErrorMessage('');
        setTempDataCode('');
        setStage('START');
    };

    const onSubmitQueryPhone = async (phoneNumber: string) => {
        setIsLoading(true);
        const res = await restorePasswordService.queryPhoneNumber(phoneNumber);
        if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(res.error_message);
            setStage('ERROR');
        } else if (res.status === 'success') {
            setIsLoading(false);
            setTempDataCode(res.data.temp_data_code);
            setStage('PHONE-EXIST');
        }
    };

    const onSubmitChangePassword = async (password: string, password_confirm: string) => {
        setIsLoading(true);
        const res = await restorePasswordService.setNewPassword(password, password_confirm, tempDataCode);
        if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(res.error_message);
            setStage('ERROR');
        } else if (res.status === 'success') {
            setIsLoading(false);
            setTempDataCode(res.data.temp_data_code);
            setStage('NEW-PASSWORD-GIVEN');
        }
    };

    const onSubmitApplyPassword = async (code: string) => {
        setIsLoading(true);
        const res = await restorePasswordService.verifyPasswordChange(tempDataCode, code);
        if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(res.error_message);
            setStage('ERROR');
        } else if (res.status === 'success') {
            setIsLoading(false);
            setStage('SUCCESS');
            localStorage.removeItem('phone');
        }

        setTimeout(() => {
            startRestorePassword();
        }, 3000);
    };

    const renderStage = () => {
        switch (stage) {
            case 'START':
                return <QueryPhone onSubmit={onSubmitQueryPhone} />;

            case 'PHONE-EXIST':
                return <NewPassword onSubmit={onSubmitChangePassword} />;

            case 'NEW-PASSWORD-GIVEN':
                return <SMSVerify onSubmit={onSubmitApplyPassword} />;

            case 'SUCCESS':
                return <SuccessPasswordChange />;

            case 'ERROR':
                return (
                    <Popup
                        title={t('pages.error.validation')}
                        onClose={() => {
                            navigate('/');
                        }}
                    >
                        <ErrorMessage message={errorMessage} />
                    </Popup>
                );
        }
    };

    return <>{isLoading ? <Preloader /> : renderStage()} </>;
};

export default RestorePassword;
