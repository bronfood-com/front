import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';
import PopupForm from '../PopupForm/PopupForm';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = () => {};
    return (
        <PopupForm title={'Регистрация'} formName="form_signup" onSubmit={handleSubmit(onSubmit)} buttonText="Далее">
            <Input type="number" name="input_username" placeholder="Владислав Иванов" nameLabel="Имя Фамилия" register={register}></Input>
            <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон" register={register}></Input>
            <Input type="password" name="input_password" placeholder="*****" nameLabel="Пароль" register={register}></Input>
        </PopupForm>
    );
};

export default SignUp;
