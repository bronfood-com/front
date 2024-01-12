import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
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
    const onSubmit = () => {
        navigate('/');
    };

    const validatePasswordMatch = (value: FieldValues) => {
        const { password } = getValues();
        return password === value || t('pages.newPassword.passwordDontMatch');
    };
    return (
        <Popup title={t('pages.profile.title')}>
            <Form name="form-profile" onSubmit={handleSubmit(handleSubmit(onSubmit))}>
                <FormInputs>
                    <Input type="text" name="username" placeholder={t('pages.profile.placeholderUserName')} nameLabel={t('pages.profile.nameLabelUserName')} register={register} errors={errors} pattern={regexClientName}></Input>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.newPassword.nameLabel')} validate={validatePasswordMatch} />
                    <InputPassword register={register} errors={errors} name="newPasswordDouble" nameLabel={t('pages.newPassword.nameLabelRepeat')} validate={validatePasswordMatch} />
                </FormInputs>
                <div className={styles.profile__button_space}></div>
                <Button>{t('pages.profile.continue')}</Button>
            </Form>
        </Popup>
    );
};

export default Profile;
