import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './SignIn.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { regexPassword } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { authApi } from '../../utils/api/auth';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const showError = !!errorMessage
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber } = data;
        setErrorMessage(null)
        const res = await authApi.login({ phone: phoneNumber, password });

        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
        } else {
            navigate('/');
        }
    };

    return (
        <Popup title={t('signIn.signInHeading')}>
            <Form name="form-auth" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${showError ? '' : styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>{t(`signIn.${errorMessage}`)}</span>
                </div>
                <FormInputs>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <Input type="password" name="password" placeholder="******" nameLabel={t('signIn.password')} register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>
                <Link to="/recovery_pass" className={`${styles.link_recovery} link`}>
                    {t('signIn.forgotPassword')}
                </Link>
                <Button>{t('signIn.loginButton')}</Button>
                <Link to="/signup" className={`${styles.link_registration} link`}>
                    {t('signIn.registartion')}
                </Link>
            </Form>
        </Popup>
    );
};

export default SignIn;
