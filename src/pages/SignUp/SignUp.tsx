import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import { regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useTranslation } from 'react-i18next';
import { authApi } from '../../utils/api/auth';
import { useState } from 'react';
import styles from './SignUp.module.scss';
import InputPassword from '../../components/InputPassword/InputPassword';
import PopupSignupSuccess from './PopupSignupSuccess/PopupSignupSuccess';

const SignUp = () => {
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const showError = !!errorMessage;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber, username } = data;
        setErrorMessage(null);
        const res = await authApi.register({ phone: phoneNumber, password, name: username, isOwner: false });

        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
        } else {
            openInfoPopup();
            setTimeout(() => {
                closeInfoPopup();
                navigate('/');
            }, 3000);
        }
    };

    const closeInfoPopup = () => {
        setIsInfoPopupOpen(false);
    };
    const openInfoPopup = () => {
        setIsInfoPopupOpen(true);
    };

    return (
        <>
            {isInfoPopupOpen ? (
                <PopupSignupSuccess isOpened={isInfoPopupOpen} closeInfoPopup={closeInfoPopup}></PopupSignupSuccess>
            ) : (
                <Popup title={t('pages.signUp.signUpHeading')}>
                    <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                        <div className={`${styles.form__notice} ${showError ? '' : styles.form__notice_invisible}`}>
                            <div className={styles.form__warning}></div>
                            <span className={styles.form__error}>{t(`pages.signUp.${errorMessage}`)}</span>
                        </div>
                        <FormInputs>
                            <Input type="text" name="username" placeholder={t('pages.signUp.namePlaceholder')} nameLabel={t('pages.signUp.name')} register={register} errors={errors} pattern={regexClientName}></Input>
                            <InputPhone register={register} errors={errors}></InputPhone>
                            <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signUp.password')} />
                        </FormInputs>
                        <Button>{t('pages.signUp.registerButton')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};

export default SignUp;
