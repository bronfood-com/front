import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './SignIn.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputPhone from '../../components/InputPhone/InputPhone';
import { authApi } from '../../utils/api/auth';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import InputPassword from '../../components/InputPassword/InputPassword';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const showError = !!errorMessage;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber } = data;
        setIsLoading(true);
        setErrorMessage(null);
        const res = await authApi.login({ phone: phoneNumber, password });
        setIsLoading(false);
        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
        } else {
            navigate('/');
        }
    };

    return (
        <Popup title={t('pages.signIn.signInHeading')}>
            {isLoading && <Preloader />}
            <Form name="form-auth" onSubmit={handleSubmit(onSubmit)}>
                {showError && <ErrorMessage message={t(`pages.signIn.${errorMessage}`)} />}
                <fieldset className={styles.form__field} disabled={isLoading}>
                    <FormInputs>
                        <InputPhone register={register} errors={errors}></InputPhone>
                        <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signIn.password')} />
                    </FormInputs>
                </fieldset>
                <Link to="/recovery_pass" className={`${styles.link_recovery} link`}>
                    {t('pages.signIn.forgotPassword')}
                </Link>
                <Button disabled={isLoading}>{t('pages.signIn.loginButton')}</Button>
                <Link to="/signup" className={`${styles.link_registration} link`}>
                    {t('pages.signIn.registartion')}
                </Link>
            </Form>
        </Popup>
    );
};

export default SignIn;
