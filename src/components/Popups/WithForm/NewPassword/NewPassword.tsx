import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from '../../Popup/Popup.module.scss';

const NewPassword = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Придумайте новый пароль'}>
            <form className={styles.form} name="form-password-new" onSubmit={onSubmit}>
                <Input type="text" name="input_newPassword" placeholder="******" nameLabel="Новый пароль"></Input>
                <Input type="text" name="input_newPasswordDouble" placeholder="******" nameLabel="Повторите пароль"></Input>
                <Button>Сохранить</Button>
            </form>
        </Popup>
    );
};

export default NewPassword;
