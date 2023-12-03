import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import { regexPassword, regexPhoneNumber, regexUserName } from '../../../../utils/consts';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
    return (
        <Popup title={'Регистрация'}>
            <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" name="input_username" placeholder="Владислав Иванов" nameLabel="Имя Фамилия" register={register} errors={errors} pattern={regexUserName}></Input>
                <Input type="tel" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон" register={register} errors={errors} pattern={regexPhoneNumber}></Input>
                <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль" register={register} errors={errors} pattern={regexPassword}></Input>
                <Button>Регистрация</Button>
            </Form>
        </Popup>
    );
};

export default SignUp;
