import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import NewPassword from '../../components/NewPassword/NewPassword';
import Popup from '../../components/Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputPhone from '../../components/InputPhone/InputPhone';
import Button from '../../components/Button/Button';
import InfoPopup from '../../components/Popups/InfoPopup/InfoPopup';
import InfoImage from '../../components/InfoImage/InfoImage';
import InputPassword from '../../components/InputPassword/InputPassword';
import { useRestorePassword } from '../../utils/hooks/useRestorePassword/useRestorePassword';
import Preloader from '../../components/Preloader/Preloader';
import Form from '../../components/Form/Form';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
// import FormInputs from '../../components/FormInputs/FormInputs';

const RestorePassword = () => {
    {
        /* нужно ли на этом уровне useForm может непосредственно в компонентах */
    }
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm();

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isLoading, stage, queryPhone, requestChangePassword, applyPasswordChange } = useRestorePassword();
    const onSubmitQueryPhone: SubmitHandler<FieldValues> = (data) => {
        if (queryPhone !== null) {
            queryPhone(data.phoneNumber);
        }
    };

    const onSubmitChangePassword: SubmitHandler<FieldValues> = (formFields) => {
        if (requestChangePassword !== null) {
            requestChangePassword(formFields.data.password, formFields.data.password_confirm);
        }
    };

    const onSubmitApplyPassword: SubmitHandler<FieldValues> = (formFields) => {
        if (applyPasswordChange !== null) {
            applyPasswordChange(formFields.sms);
        }
    };

    const getErrorMessage = (): string => {
        return localStorage.getItem('error') || '';
    };

    const renderStage = () => {
        switch (stage) {
            case 'START':
                return (
                    <Popup
                        title={t('pages.passwordRecovery.title')}
                        onClose={() => {
                            navigate('/');
                        }}
                    >
                        <Form name="form-query-phone" onSubmit={handleSubmit(onSubmitQueryPhone)}>
                            <InputPhone errors={errors} register={register} />
                            <Button>{t('pages.passwordRecovery.continue')}</Button>
                        </Form>
                    </Popup>
                );

            case 'PHONE-EXIST':
                return <NewPassword register={register} control={control} errors={errors} onSubmit={onSubmitChangePassword} />;

            case 'NEW-PASSWORD-GIVEN':
                return (
                    <Popup
                        title={t('pages.SMS.title')}
                        onClose={() => {
                            navigate('/');
                        }}
                    >
                        <Form name="form-change-password" onSubmit={handleSubmit(onSubmitApplyPassword)}>
                            <InputPassword name={'sms'} nameLabel={t('pages.SMS.code')} register={register} errors={errors}></InputPassword>
                            <Button>{t('pages.SMS.continue')}</Button>
                        </Form>
                    </Popup>
                );

            case 'SUCCESS':
                return (
                    <InfoPopup isOpened={true}>
                        <h2>{t('pages.passwordSaved.title')}</h2>
                        <InfoImage mode="stars_tube"></InfoImage>
                    </InfoPopup>
                );
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
