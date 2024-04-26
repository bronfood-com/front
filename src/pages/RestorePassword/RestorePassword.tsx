import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
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
    const {
        register,
        formState: { errors },
        control,
        watch,
    } = useForm();

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stage, setStage] = useState<TypeStage>('START');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [tempDataCode, setTempDataCode] = useState<string>('');
    const [confirmationCode, setConfirmationCode] = useState<string[]>(['', '', '', '']);

    const startRestorePassword = () => {
        setErrorMessage('');
        setTempDataCode('');
        setConfirmationCode(['', '', '', '']);
        setStage('START');
    };

    const onSubmitQueryPhone: SubmitHandler<FieldValues> = async (formFields) => {
        const phoneNumber = formFields.data.phoneNumber;
        setIsLoading(true);
        localStorage.setItem('phone', phoneNumber);
        const mappedPhoneNumber = phoneNumber.replace(/\D/g, '');
        if (mappedPhoneNumber !== '' && mappedPhoneNumber.length > 10) {
            const res = await restorePasswordService.queryPhoneNumber(mappedPhoneNumber);
            if (res.status === 'error') {
                setIsLoading(false);
                setErrorMessage(res.error_message);
                setStage('ERROR');
            }
            if (res.status === 'success') {
                setIsLoading(false);
                setTempDataCode(res.data.temp_data_code);
                setStage('PHONE-EXIST');
            }
        }
    };

    const onSubmitChangePassword: SubmitHandler<FieldValues> = async (formFields) => {
        const { password, password_confirm } = formFields.data;
        setIsLoading(true);
        const res = await restorePasswordService.setNewPassword(password, password_confirm, tempDataCode);
        if (res.status === 'error') {
            setIsLoading(false);
            setErrorMessage(res.error_message);
            setStage('ERROR');
        }
        if (res.status === 'success') {
            setIsLoading(false);
            setTempDataCode(res.data.temp_data_code);
            setStage('NEW-PASSWORD-GIVEN');
        }
    };

    const onSubmitApplyPassword = async () => {
        setIsLoading(true);
        const code = confirmationCode.join('');
        if (tempDataCode !== '' && code !== '' && code.length === 4) {
            const res = await restorePasswordService.verifyPasswordChange(tempDataCode, code);
            if (res.status === 'error') {
                setIsLoading(false);
                setErrorMessage(res.error_message);
                setStage('ERROR');
            }
            if (res.status === 'success') {
                setIsLoading(false);
                setStage('SUCCESS');
                localStorage.removeItem('phone');
            }
            setTimeout(() => {
                startRestorePassword();
            }, 3000);
        }
    };

    const renderStage = () => {
        switch (stage) {
            case 'START':
                return <QueryPhone control={control} register={register} errors={errors} onSubmit={onSubmitQueryPhone} />;

            case 'PHONE-EXIST':
                return <NewPassword control={control} register={register} errors={errors} watch={watch} onSubmit={onSubmitChangePassword} />;

            case 'NEW-PASSWORD-GIVEN':
                return <SMSVerify values={confirmationCode} setCode={setConfirmationCode} control={control} errors={errors} onSubmit={onSubmitApplyPassword} />;

            case 'SUCCESS':
                return <SuccessPasswordChange />;

            case 'ERROR':
                return (
                    <Popup
                        title={t('pages.error.server')}
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
