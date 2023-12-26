import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import { useTranslation } from 'react-i18next';

const NewPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/password_done');
    };
    return (
        <Popup title={t('newPassword.title')}>
            <Form name="form-password-new" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="text" name="input_newPassword" placeholder="******" nameLabel={t('newPassword.nameLabel')}></Input>
                    <Input type="text" name="input_newPasswordDouble" placeholder="******" nameLabel={t('newPassword.nameLabelRepeat')}></Input>
                </FormInputs>
                <Button>{t('newPassword.button')}</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
