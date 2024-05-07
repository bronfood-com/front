import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './SignIn.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputPassword from '../../components/InputPassword/InputPassword';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';

const SignIn = () => {
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const { currentUser, signIn } = useCurrentUser();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (currentUser) {
            navigate('/restaurants');
        }
    }, [currentUser, navigate]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber } = data;
        const result = await signIn.mutation({ phone: phoneNumber, password });
        if (result !== null) {
            setIsErrorVisible(true);
        }
    };

    return (
        <Popup
            title={t('pages.signIn.signInHeading')}
            onClose={() => {
                navigate('/');
                setIsErrorVisible(false);
            }}
        >
            {signIn.isLoading && <Preloader />}
            <Form name="form-auth" onSubmit={handleSubmit(onSubmit)}>
                {isErrorVisible && signIn.errorMessage && (
                    <ErrorMessage
                        message={t(`pages.signIn.${signIn.errorMessage}`)}
                    />
                )}
                <fieldset
                    className={styles.form__field}
                    disabled={signIn.isLoading}
                >
                    <FormInputs>
                        <InputPhone
                            register={register}
                            errors={errors}
                        ></InputPhone>
                        <InputPassword
                            register={register}
                            errors={errors}
                            name="password"
                            nameLabel={t('pages.signIn.password')}
                            required={true}
                        />
                    </FormInputs>
                </fieldset>
                <Link
                    to="/restore-password"
                    className={`${styles.link_recovery} link`}
                >
                    {t('pages.signIn.forgotPassword')}
                </Link>
                <Button disabled={signIn.isLoading}>
                    {t('pages.signIn.loginButton')}
                </Button>
                <Link
                    to="/signup"
                    className={`${styles.link_registration} link`}
                >
                    {t('pages.signIn.registartion')}
                </Link>
            </Form>
        </Popup>
    );
};

export default SignIn;
