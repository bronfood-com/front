import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';
import PopupForm from '../PopupForm/PopupForm';

const NewPassword = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = () => {};
    return (
        <PopupForm title={'Придумайте новый пароль'} formName="form_setNewPassword" onSubmit={handleSubmit(onSubmit)} buttonName="Сохранить">
            <Input type="password" name="input_newPassword" placeholder="*****" nameLabel="Новый пароль" register={register}></Input>
            <Input type="password" name="input_newPasswordDouble" placeholder="*****" nameLabel="Повторите пароль" register={register}></Input>
        </PopupForm>
    );
};

export default NewPassword;
