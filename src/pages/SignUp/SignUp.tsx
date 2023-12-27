import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import { regexPassword, regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useTranslation } from 'react-i18next';
import { authApi } from '../../utils/api/auth';
import { useState } from 'react';
import styles from './SignUp.module.scss';

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const showError = !!errorMessage
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber, username } = data;
        const res = await authApi.register({ phone: phoneNumber, password, name: username, isOwner: false });
        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
        } else {
            navigate('/signup_done');
        }
    };

    return (
        <Popup title={t('signUp.signUpHeading')}>
            <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.form__notice} ${showError ? '' : styles.form__notice_invisible}`}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>{t(`signUp.${errorMessage}`)}</span>
                </div>
                <FormInputs>
                    <Input type="text" name="username" placeholder={t('signUp.namePlaceholder')} nameLabel={t('signUp.name')} register={register} errors={errors} pattern={regexClientName}></Input>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <Input type="password" name="password" placeholder="******" nameLabel={t('signUp.password')} register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>
                <Button>{t('signUp.registerButton')}</Button>
            </Form>
        </Popup>
    );
};

export default SignUp;
