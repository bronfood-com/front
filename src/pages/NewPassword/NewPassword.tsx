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
        <Popup title={t('pages.newPassword.title')}>
            <Form name="form-password-new" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="text" name="input_newPassword" placeholder="******" nameLabel={t('pages.newPassword.nameLabel')}></Input>
                    <Input type="text" name="input_newPasswordDouble" placeholder="******" nameLabel={t('pages.newPassword.nameLabelRepeat')}></Input>
                </FormInputs>
                <Button>{t('pages.newPassword.button')}</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
