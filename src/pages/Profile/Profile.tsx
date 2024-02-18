
import { useState } from 'react';
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
import InputPassword from '../../components/InputPassword/InputPassword';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';

const Profile = () => {
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const { updateUser } = useCurrentUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const { t } = useTranslation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, confirmPassword, phoneNumber, username } = data;
        const result = await updateUser.mutation({ phone: phoneNumber, password, confirmPassword, name: username });

        if (result !== null) {
            setIsErrorVisible(true);
        }
    };
    const validatePasswordMatch = (value: FieldValues) => {
        const { newPassword } = getValues();
        return newPassword === value || t('pages.profile.passwordDontMatch');
    };
    return (
        <Popup title={t('pages.profile.title')} onClose={() => setIsErrorVisible(false)}>
            {updateUser.isLoading && <Preloader />}
            <Form name="form-profile" onSubmit={handleSubmit(onSubmit)}>
                {isErrorVisible && updateUser.errorMessage && <ErrorMessage message={t(`pages.updateUser.${updateUser.errorMessage}`)} />}
                <FormInputs>
                    <Input type="text" name="username" placeholder={t('pages.profile.placeholderUserName')} nameLabel={t('pages.profile.nameLabelUserName')} register={register} errors={errors} pattern={regexClientName}></Input>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.profile.nameLabelPassword')} />
                    <InputPassword register={register} errors={errors} name="newPasswordDouble" nameLabel={t('pages.profile.nameLabelRepeatPassword')} validate={validatePasswordMatch} />
                </FormInputs>
                <div className={styles.profile__button_space}></div>
                <Button>{t('pages.profile.continue')}</Button>
            </Form>
        </Popup>
    );
};

export default Profile;
