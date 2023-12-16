import { useRef } from 'react';
import { authApi } from '../../utils/api/auth';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './SignIn.module.scss';

const SignIn = () => {
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (phoneNumberRef.current?.value && passwordRef.current?.value) {
            const res = await authApi.login({ phone: phoneNumberRef.current?.value, password: passwordRef.current?.value });
            alert(`${res.status} phone: ${res.data?.phone}`)
        }
    };

    return (
        <Popup title={'Вход'}>
            <Form name="form-signin" onSubmit={onSubmit}>
                <div className={styles.form__notice}>
                    <div className={styles.form__warning}></div>
                    <span className={styles.form__error}>Телефон или пароль введен неверно, повторите попытку еще раз.</span>
                </div>
                <FormInputs>
                    <Input ref={phoneNumberRef} type="string" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                    <Input ref={passwordRef} type="password" name="input_password" placeholder="******" nameLabel="Пароль"></Input>
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
