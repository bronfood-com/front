import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from '../../Popup/Popup.module.scss';

const SignIn = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Вход'}>
            <form className={styles.form} name="form-signin" onSubmit={onSubmit}>
                <div className={styles.form__notice}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>Телефон или пароль введен неверно, повторите попытку еще раз.</span>
                </div>
                <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль"></Input>
                <a href="/" className={`${styles.link_recovery} link`}>
                    Забыли пароль?
                </a>
                <Button>Вход</Button>
                <a href="/" className={styles.popup__link}>
                    Регистрация
                </a>
            </form>
        </Popup>
    );
};

export default SignIn;
