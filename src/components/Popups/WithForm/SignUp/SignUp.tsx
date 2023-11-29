import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from '../../Popup/Popup.module.scss';

const SignUp = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Регистрация'}>
            <form className={styles.form} name="form-signup" onSubmit={onSubmit}>
                <Input type="text" name="input_username" placeholder="Владислав Иванов" nameLabel="Имя Фамилия"></Input>
                <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль"></Input>
                <Button>Регистрация</Button>
            </form>
        </Popup>
    );
};

export default SignUp;
