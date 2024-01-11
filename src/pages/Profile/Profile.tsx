import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import InputPassword from '../../components/InputPassword/InputPassword';
const Profile = () => {

    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/');
    };
    
    return (
        <Popup title={t('pages.profile.title')}>
            <Form name="form-profile" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                    <Input type="text" name="username" placeholder={t('pages.profile.placeholderUserName')} nameLabel={t('pages.profile.nameLabelUserName')}></Input>
                    <Input type="number" name="telephone" placeholder={t('pages.profile.placeholderPhone')} nameLabel={t('pages.profile.nameLabelPhone')}></Input>
                    <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.newPassword.nameLabel')} />
                    <InputPassword register={register} errors={errors} name="newPasswordDouble" nameLabel={t('pages.newPassword.nameLabelRepeat')} />
                </FormInputs>
                <div className={styles.profile__button_space}></div>
                <Button>{t('pages.profile.continue')}</Button>
            </Form>
        </Popup>
    );
};

export default Profile;
