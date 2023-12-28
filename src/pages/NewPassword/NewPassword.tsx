import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
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
