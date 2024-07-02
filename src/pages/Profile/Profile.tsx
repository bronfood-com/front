import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';
import SMSConfirm from '../../components/SMSConfirm/SMSConfirm';
import InputPassword from '../../components/InputPassword/InputPassword';

const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentUser, updateUser, confirmUpdateUser } = useCurrentUser();
    const [fullname, setFullname] = useState(currentUser?.fullname);
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await updateUser.mutateAsync({
            phone: data.phoneNumber.replace(/\D/g, ''),
            fullname: data.username,
            password: data.newPassword || null,
            password_confirm: data.newPasswordConfirm || null,
        });
        setIsConfirmOpen(true);
    };

    useEffect(() => {
        setFullname(currentUser?.fullname);
        setPhoneNumber(currentUser?.phone);
    }, [currentUser]);

    const validatePasswordMatch = (value: FieldValues) => {
        const { newPassword } = getValues();
        return newPassword === value || t('pages.profile.passwordDontMatch');
    };

    const confirm = async (code: string) => {
        await confirmUpdateUser.mutateAsync({ confirmation_code: code });
        setIsConfirmOpen(false);
    };

    return (
        <>
            {isConfirmOpen ? (
                <SMSConfirm onClose={confirmUpdateUser.reset} isLoading={confirmUpdateUser.isPending} error={confirmUpdateUser.error?.message} isConfirmErrorVisible={confirmUpdateUser.isError} onSubmit={confirm} />
            ) : (
                <Popup
                    title={t('pages.profile.title')}
                    onClose={() => {
                        updateUser.reset();
                        navigate('/');
                    }}
                >
                    {updateUser.isPending && <Preloader />}
                    <Form name="form-profile" onSubmit={handleSubmit(onSubmit)}>
                        {updateUser.isError && <ErrorMessage message={updateUser.error.message} />}
                        <FormInputs>
                            <Input type="text" name="username" placeholder={t('pages.profile.placeholderUserName')} nameLabel={t('pages.profile.nameLabelUserName')} register={register} errors={errors} pattern={regexClientName} value={fullname}></Input>
                            <InputPhone register={register} errors={errors} value={phoneNumber}></InputPhone>
                            <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.profile.nameLabelPassword')} required={false} />
                            <InputPassword register={register} errors={errors} name="newPasswordConfirm" nameLabel={t('pages.profile.nameLabelRepeatPassword')} validate={validatePasswordMatch} required={false} />
                        </FormInputs>
                        <div className={styles.profile__button_space}></div>
                        <Button disabled={updateUser.isPending}>{t('pages.profile.save')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};

export default Profile;
