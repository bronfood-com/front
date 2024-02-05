import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
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
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const SignUp = () => {
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const showError = !!errorMessage;
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber, username } = data;
        setIsLoading(true);
        setErrorMessage(null);
        const res = await authApi.register({ phone: phoneNumber, password, name: username, isOwner: false });
        setIsLoading(false);
        if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
        } else {
            openInfoPopup();
        }
    };

    const openInfoPopup = () => {
        setIsInfoPopupOpen(true);
    };

    return (
        <>
            {isInfoPopupOpen ? (
                <PopupSignupSuccess isOpened={isInfoPopupOpen}></PopupSignupSuccess>
            ) : (
                <Popup title={t('pages.signUp.signUpHeading')}>
                    {isLoading && <Preloader />}
                    <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                        {showError && <ErrorMessage message={t('pages.signUp.phoneNumberIsAlreadyUsed')} />}
                        <fieldset className={styles.form__field} disabled={isLoading}>
                            <FormInputs>
                                <Input type="text" name="username" placeholder={t('pages.signUp.namePlaceholder')} nameLabel={t('pages.signUp.name')} register={register} errors={errors} pattern={regexClientName}></Input>
                                <InputPhone register={register} errors={errors}></InputPhone>
                                <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signUp.password')} />
                            </FormInputs>
                        </fieldset>
                        <Button disabled={isLoading}>{t('pages.signUp.registerButton')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};

export default SignUp;
