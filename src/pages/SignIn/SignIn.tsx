import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './SignIn.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputPassword from '../../components/InputPassword/InputPassword';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';

const SignIn = () => {
    const { errorMessage, currentUser, signIn } = useCurrentUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const showError = !!errorMessage;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
        // Doesnt pass ci build with navigate deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber } = data;
        setIsLoading(true);
        await signIn({ phone: phoneNumber, password });
        setIsLoading(false);
    };

    return (
        <Popup title={t('pages.signIn.signInHeading')}>
            {isLoading && <Preloader />}
            <Form name="form-auth" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${showError ? '' : styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>{t(`pages.signIn.${errorMessage}`)}</span>
                </div>
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
