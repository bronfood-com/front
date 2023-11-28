import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';
import PopupForm from '../PopupForm/PopupForm';

const PasswordRecovery = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = () => {};
    return (
        <PopupForm title={'Восстановить пароль'} formName="form_recoveryPassword" onSubmit={handleSubmit(onSubmit)} buttonText="Далее">
            <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон" register={register}></Input>
        </PopupForm>
    );
};

export default PasswordRecovery;
