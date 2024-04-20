import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import NewPassword from './NewPassword/NewPassword';
import Popup from '../../components/Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRestorePassword } from '../../utils/hooks/useRestorePassword/useRestorePassword';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SMSVerify from '../../components/SMSVerify/SMSVerify';
import SuccessPasswordChange from './SuccessPasswordChange/SuccessPasswordChange';
import QueryPhone from './QueryPhone/QueryPhone';

const RestorePassword = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useForm();

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isLoading, stage, queryPhone, requestChangePassword, applyPasswordChange } = useRestorePassword();

    const onSubmitQueryPhone: SubmitHandler<FieldValues> = (formFields) => {
        if (queryPhone !== null) {
            queryPhone(formFields.data.phoneNumber);
        }
    };

    const onSubmitChangePassword: SubmitHandler<FieldValues> = (formFields) => {
        if (requestChangePassword !== null) {
            requestChangePassword(formFields.data.password, formFields.data.password_confirm);
        }
    };

    const onSubmitApplyPassword: SubmitHandler<FieldValues> = () => {
        if (applyPasswordChange !== null) {
            applyPasswordChange();
        }
    };

    const getErrorMessage = (): string => {
        return localStorage.getItem('error') || '';
    };

    const renderStage = () => {
        switch (stage) {
            case 'START':
                return <QueryPhone control={control} register={register} errors={errors} onSubmit={onSubmitQueryPhone} />

            case 'PHONE-EXIST':
                return <NewPassword control={control} register={register}  errors={errors} onSubmit={onSubmitChangePassword} />;

            case 'NEW-PASSWORD-GIVEN':
                return <SMSVerify control={control} errors={errors} onSubmit={onSubmitApplyPassword}  />;

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
                        <ErrorMessage message={getErrorMessage()} />
                    </Popup>
                );
        }
    };

    return <>{isLoading ? <Preloader /> : renderStage()} </>;
};

export default RestorePassword;
