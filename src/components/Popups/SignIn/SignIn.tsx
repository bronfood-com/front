import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';
import PopupForm from '../PopupForm/PopupForm';
import styles from './SignIn.module.scss';

const SignIn = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = () => {};
    return (
        <PopupForm title={'Вход'} formName="form_signin" onSubmit={handleSubmit(onSubmit)} buttonText="Войти">
            <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон" register={register}></Input>
            <Input type="password" name="input_password" placeholder="*****" nameLabel="Пароль" register={register}></Input>
            <a href="/" className={`${styles.link_recovery} link`}>
                Забыли пароль?
            </a>
        </PopupForm>
    );
};

export default SignIn;
