import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './NewPassword.module.scss';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputPassword from '../../components/InputPassword/InputPassword';
import Preloader from '../../components/Preloader/Preloader';

const NewPassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        setIsLoading(true);
        navigate('/password_done');
        setIsLoading(false);
    };
    const validatePasswordMatch = (value: FieldValues) => {
        const { newPassword } = getValues();
        return newPassword === value || t('pages.newPassword.passwordDontMatch');
    };

    return (
        <Popup title={t('pages.newPassword.title')}>
             {isLoading && <Preloader />}
            <Form name="form-password-new" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.form__field} disabled={isLoading}>
                <FormInputs>
                    <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.newPassword.nameLabel')} />
                    <InputPassword register={register} errors={errors} name="newPasswordDouble" nameLabel={t('pages.newPassword.nameLabelRepeat')} validate={validatePasswordMatch} />
                </FormInputs>
                </fieldset>
                <Button disabled={isLoading}>{t('pages.newPassword.button')}</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
