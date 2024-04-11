import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import { regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './SignUp.module.scss';
import InputPassword from '../../components/InputPassword/InputPassword';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import SMSConfirm from '../../components/SMSConfirm/SMSConfirm';
import PopupSignupSuccess from './PopupSignupSuccess/PopupSignupSuccess';

const SignUp = () => {
    const navigate = useNavigate();
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [isConfirmErrorVisible, setIsConfirmErrorVisible] = useState(false);
    const { signUp, confirmSignUp } = useCurrentUser();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber, username } = data;
        const result = await signUp.mutation({ phone: phoneNumber, password, name: username });

        if (result !== null) {
            setIsErrorVisible(true);
        }

        setIsConfirmOpen(true);
    };

    const confirm = async (code: string) => {
        const result = await confirmSignUp.mutation(code);
        if (!result) {
            setIsConfirmErrorVisible(true);
        } else {
            setIsInfoPopupOpen(true);
        }
    };

    return (
        <>
            {isConfirmOpen ? (
                <SMSConfirm isLoading={confirmSignUp.isLoading} error={confirmSignUp.errorMessage} isConfirmErrorVisible={isConfirmErrorVisible} onSubmit={confirm} isInfoPopupOpen={isInfoPopupOpen} popupSuccessOpened={<PopupSignupSuccess isOpened={isInfoPopupOpen} />} />
            ) : (
                <Popup
                    title={t('pages.signUp.signUpHeading')}
                    onClose={() => {
                        navigate('/');
                        setIsErrorVisible(false);
                    }}
                >
                    {signUp.isLoading && <Preloader />}
                    <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                        {isErrorVisible && signUp.errorMessage && <ErrorMessage message={t(`pages.signUp.${signUp.errorMessage}`)} />}
                        <fieldset className={styles.form__field} disabled={signUp.isLoading}>
                            <FormInputs>
                                <Input type="text" name="username" placeholder={t('pages.signUp.namePlaceholder')} nameLabel={t('pages.signUp.name')} register={register} errors={errors} pattern={regexClientName}></Input>
                                <InputPhone register={register} errors={errors}></InputPhone>
                                <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signUp.password')} />
                            </FormInputs>
                        </fieldset>
                        <Button disabled={signUp.isLoading}>{t('pages.signUp.registerButton')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};

export default SignUp;
