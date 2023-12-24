import { Link } from 'react-router-dom';
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

const SignIn = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { input_password, input_telephone } = data;
        const res = await authApi.login({ phone: input_telephone, password: input_password });
        alert(`status: ${res.status}, user: ${res.data?.name} ${res.data?.phone}`);
    };
    return (
        <Popup title={t('auth.heading')}>
            <Form name="form-auth" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>{t('auth.errorMessage')}</span>
                </div>
                <FormInputs>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <Input type="password" name="input_password" placeholder="******" nameLabel={t('auth.passwordInput')} register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>

                <Link to="/recovery_pass" className={`${styles.link_recovery} link`}>
                    {t('auth.forgotPass')}
                </Link>
                <Button>{t('auth.loginButton')}</Button>
                <Link to="/signup" className={`${styles.link_registration} link`}>
                    {t('auth.regLink')}
                </Link>
            </Form>
        </Popup>
    );
};

export default SignIn;
