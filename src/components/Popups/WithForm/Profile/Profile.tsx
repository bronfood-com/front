import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from './Profile.module.scss';

const Profile = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Профиль'}>
            <Form name="form-signin" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="text" name="input_username" placeholder="Владислав Иванов" nameLabel="Имя Фамилия"></Input>
                    <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                    <Input type="password" name="input_password" placeholder="******" nameLabel="Новый пароль"></Input>
                    <Input type="password" name="input_password" placeholder="******" nameLabel="Повторите пароль"></Input>
                </FormInputs>
                <div className={styles.profile__button_space}></div>
                <Button>Далее</Button>
            </Form>
        </Popup>
    );
};

export default Profile;
