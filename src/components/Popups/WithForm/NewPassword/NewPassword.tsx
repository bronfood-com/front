import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';

const NewPassword = () => {
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/password_done');
    };
    return (
        <Popup title={'Придумайте новый пароль'}>
            <Form name="form-password-new" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="text" name="input_newPassword" placeholder="******" nameLabel="Новый пароль"></Input>
                    <Input type="text" name="input_newPasswordDouble" placeholder="******" nameLabel="Повторите пароль"></Input>
                </FormInputs>
                <Button>Сохранить</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
