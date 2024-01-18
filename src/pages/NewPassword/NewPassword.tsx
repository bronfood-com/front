import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputPassword from '../../components/InputPassword/InputPassword';
import { useState } from 'react';
import { authApi } from '../../utils/api/auth';
import styles from './NewPassword.module.scss';

const NewPassword = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const showError = !!errorMessage;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { newPassword, newPasswordDouble } = data;
        setErrorMessage(null);
        const res = await authApi.editPassword({ password: newPassword, confirmPassword: newPasswordDouble });
        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
        } else {
            navigate('/password_done');
        }
    };

    const validatePasswordMatch = (value: FieldValues) => {
        const { newPassword } = getValues();
        return newPassword === value || t('pages.newPassword.passwordDontMatch');
    };

    return (
        <Popup title={t('pages.newPassword.title')}>
            <Form name="form-password-new" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${showError ? '' : styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>{t(`pages.newPassword.${errorMessage}`)}</span>
                </div>
                <FormInputs>
                    <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.newPassword.nameLabel')} />
                    <InputPassword register={register} errors={errors} name="newPasswordDouble" nameLabel={t('pages.newPassword.nameLabelRepeat')} validate={validatePasswordMatch} />
                </FormInputs>
                <Button>{t('pages.newPassword.button')}</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
