import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import { regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import styles from './SignUp.module.scss';
import InputPassword from '../../components/InputPassword/InputPassword';
import PopupSignupSuccess from './PopupSignupSuccess/PopupSignupSuccess';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const SignUp = () => {
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const { errorMessage, currentUser, signUp } = useCurrentUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const showError = !!errorMessage;
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (currentUser) {
            openInfoPopup();
        }
    }, [currentUser]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber, username } = data;
        setIsLoading(true);
        await signUp({ phone: phoneNumber, password, name: username });
        setIsLoading(false);
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
                        {showError && <ErrorMessage message={t(`pages.signUp.${errorMessage}`)} />}
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
