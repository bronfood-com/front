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
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currentUser } = useCurrentUser();
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const { updateUser } = useCurrentUser();

    const fullname = currentUser?.fullname;
    const phoneNumber = currentUser?.phone;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const result = await updateUser.mutation({
            phone: data.phoneNumber,
            fullname: data.username,
            password: data.newPassword,
            confirmPassword: data.newPasswordDouble,
        });

        if (result !== null) {
            setIsErrorVisible(true);
        }

        location.reload();
    };

    return (
        <Popup
            title={t('pages.profile.title')}
            onClose={() => {
                navigate('/');
                setIsErrorVisible(false);
            }}
        >
            <Form name="form-profile" onSubmit={handleSubmit(onSubmit)}>
                {isErrorVisible && updateUser.errorMessage && <ErrorMessage message={t(`pages.profile.errorMessage}`)} />}
                <FormInputs>
                    <Input type="text" name="username" placeholder={t('pages.profile.placeholderUserName')} nameLabel={t('pages.profile.nameLabelUserName')} register={register} errors={errors} pattern={regexClientName} value={fullname}></Input>
                    <InputPhone register={register} errors={errors} value={phoneNumber}></InputPhone>
                </FormInputs>
                <div className={styles.profile__button_space}></div>
                <Button>{t('pages.profile.save')}</Button>
            </Form>
        </Popup>
    );
};

export default Profile;
