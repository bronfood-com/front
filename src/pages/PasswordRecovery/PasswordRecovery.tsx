import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';

const PasswordRecovery = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/new_pass');
    };
    return (
        <Popup title={t('passwordRecovery.title')}>
            <Form name="form-password-recovery" onSubmit={onSubmit}>
                <FormInputs>
                    <Input type="number" name="input_telephone" placeholder={t('passwordRecovery.placeholder')} nameLabel={t('passwordRecovery.phoneNumber')}></Input>
                </FormInputs>
                <Button>{t('passwordRecovery.continue')}</Button>
            </Form>
        </Popup>
    );
};

export default PasswordRecovery;
