import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
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
                    <Input type="number" name="input_telephone" placeholder={t('passwordRecovery.placeholder')} nameLabel={t('passwordRecovery.nameLabel')}></Input>
                </FormInputs>
                <Button>{t('passwordRecovery.button')}</Button>
            </Form>
        </Popup>
    );
};

export default PasswordRecovery;
