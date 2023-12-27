import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import { regexPassword, regexClientName } from '../../../../utils/consts';
import InputPhone from '../../../InputPhone/InputPhone';

const SignUp = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<FieldValues> = () => {
        navigate('/signup_done');
    };
    return (
        <Popup title={'Регистрация'}>
            <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                    <Input type="text" name="input_username" placeholder="Владислав Иванов" nameLabel="Имя Фамилия" register={register} errors={errors} pattern={regexClientName}></Input>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль" register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>
                <Button>Регистрация</Button>
            </Form>
        </Popup>
    );
};

export default SignUp;
