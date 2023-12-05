import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import styles from './SignIn.module.scss';

const SignIn = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Вход'}>
            <Form name="form-signin" onSubmit={onSubmit}>
                <div className={styles.form__notice}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>Телефон или пароль введен неверно, повторите попытку еще раз.</span>
                </div>
                <FormInputs>
                    <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                    <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль"></Input>
                </FormInputs>

                <a href="/" className={`${styles.link_recovery} link`}>
                    Забыли пароль?
                </a>
                <Button>Вход</Button>
                <a href="/" className={`${styles.link_registration} link`}>
                    Регистрация
                </a>
            </Form>
        </Popup>
    );
};

export default SignIn;
