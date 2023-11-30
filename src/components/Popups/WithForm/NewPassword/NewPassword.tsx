import { Form } from 'react-hook-form';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';

const NewPassword = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Придумайте новый пароль'}>
            <Form name="form-password-new" onSubmit={onSubmit}>
                <Input type="text" name="input_newPassword" placeholder="******" nameLabel="Новый пароль"></Input>
                <Input type="text" name="input_newPasswordDouble" placeholder="******" nameLabel="Повторите пароль"></Input>
                <Button>Сохранить</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
