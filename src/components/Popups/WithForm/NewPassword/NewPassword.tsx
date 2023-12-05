import { Form } from 'react-hook-form';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import FormInputs from '../../../FormInputs/FormInputs';

const NewPassword = () => {
    const onSubmit = () => {};
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
