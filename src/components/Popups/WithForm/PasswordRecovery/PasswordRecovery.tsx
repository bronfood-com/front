import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';

const PasswordRecovery = () => {
    const onSubmit = () => {};
    return (
        <Popup title={'Восстановить пароль'}>
            <Form name="form-password-recovery" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="number" name="input_telephone" placeholder="+7 (***)" nameLabel="Телефон"></Input>
                </FormInputs>
                <Button>Далее</Button>
            </Form>
        </Popup>
    );
};

export default PasswordRecovery;
