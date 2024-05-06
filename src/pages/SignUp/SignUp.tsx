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
    const [isConfirmErrorVisible, setIsConfirmErrorVisible] = useState(false);
    const { signUp, confirmSignUp } = useCurrentUser();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber, username } = data;
        signUp.mutate({ phone: phoneNumber.replace(/\D/g, ''), password, fullname: username });
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
            {signUp.isSuccess ? (
                <SMSConfirm isLoading={confirmSignUp.isLoading} error={confirmSignUp.errorMessage} isConfirmErrorVisible={isConfirmErrorVisible} onSubmit={confirm} isInfoPopupOpen={isInfoPopupOpen} popupSuccessOpened={<PopupSignupSuccess isOpened={isInfoPopupOpen} />} />
            ) : (
                <Popup
                    title={t('pages.signUp.signUpHeading')}
                    onClose={() => {
                        navigate('/');
                    }}
                >
                    {signUp.isPending && <Preloader />}
                    <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                        {signUp.isError && <ErrorMessage message={t(`pages.signUp.${signUp.error.message}`)} />}
                        <fieldset className={styles.form__field} disabled={signUp.isPending}>
                            <FormInputs>
                                <Input type="text" name="username" placeholder={t('pages.signUp.namePlaceholder')} nameLabel={t('pages.signUp.name')} register={register} errors={errors} pattern={regexClientName}></Input>
                                <InputPhone register={register} errors={errors}></InputPhone>
                                <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signUp.password')} required={true} />
                            </FormInputs>
                        </fieldset>
                        <Button disabled={signUp.isPending}>{t('pages.signUp.registerButton')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};

export default SignUp;
