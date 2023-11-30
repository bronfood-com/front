import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';

const SignUp = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Регистрация'}>
            <Form name="form-signup" onSubmit={onSubmit}>
                <Input type="text" name="input_username" placeholder="Владислав Иванов" nameLabel="Имя Фамилия"></Input>
                <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                <Input type="password" name="input_password" placeholder="******" nameLabel="Пароль"></Input>
                <Button>Регистрация</Button>
            </Form>
        </Popup>
    );
};

export default SignUp;
