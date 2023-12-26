import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
const Profile = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/');
    };
    return (
        <Popup title={t('profile.title')}>
            <Form name="form-profile" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="text" name="input_username" placeholder={t('profile.placeholderUserName')} nameLabel={t('profile.nameLabelUserName')}></Input>
                    <Input type="number" name="input_telephone" placeholder={t('profile.placeholderPhone')} nameLabel={t('profile.nameLabelPhone')}></Input>
                    <Input type="password" name="input_password" placeholder={t('profile.placeholderPassword')} nameLabel={t('profile.nameLabelPassword')}></Input>
                    <Input type="password" name="input_password" placeholder={t('profile.placeholderRepeatPassword')} nameLabel={t('profile.nameLabelRepeatPassword')}></Input>
                </FormInputs>
                <div className={styles.profile__button_space}></div>
                <Button>{t('profile.button')}</Button>
            </Form>
        </Popup>
    );
};

export default Profile;
