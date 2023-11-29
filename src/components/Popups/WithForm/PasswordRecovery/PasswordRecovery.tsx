import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from '../../Popup/Popup.module.scss';

const PasswordRecovery = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Восстановить пароль'}>
            <form className={styles.form} name="form-password-recovery" onSubmit={onSubmit}>
                <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                <Button>Далее</Button>
            </form>
        </Popup>
    );
};

export default PasswordRecovery;
