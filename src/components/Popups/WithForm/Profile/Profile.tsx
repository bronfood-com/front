import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from './Profile.module.scss';
import InputPhone from '../../../InputPhone/InputPhone';
import { regexClientName, regexPassword } from '../../../../utils/consts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        getValues,
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = () => {
        const { password, passwordRepeat } = getValues();
        if (password !== passwordRepeat) {
            setError('passwordRepeat', {
                type: 'manual',
                message: 'Неверный ввод',
            });
            return;
        }
        navigate('/');
    };

    return (
        <Popup title={t('pages.profile.profileHeading')}>
            <Form name="form-profile" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                    <Input type="text" name="username" placeholder={t('pages.profile.namePlaceholder')} nameLabel={t('pages.profile.name')} register={register} errors={errors} pattern={regexClientName}></Input>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <Input type="password" name="password" placeholder="******" nameLabel={t('pages.profile.password')} register={register} errors={errors} pattern={regexPassword}></Input>
                    <Input type="password" name="passwordRepeat" placeholder="******" nameLabel={t('pages.profile.passwordRepeat')} register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>
                <div className={styles.profile__button_space}></div>
                <Button>Далее</Button>
            </Form>
        </Popup>
    );
};

export default Profile;
