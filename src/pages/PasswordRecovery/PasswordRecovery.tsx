import Popup from '../../components/Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, Form } from 'react-hook-form';
import FormInputs from '../../components/FormInputs/FormInputs';
import InputPassword from '../../components/InputPassword/InputPassword';

const PasswordRecovery = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        register,
        formState: { errors },
    } = useForm();

    return (
        <Popup
            title="1"
            onClose={() => {
                navigate('/');
            }}
        >
            <Form name="password-recovery">
                <FormInputs>
                    <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signIn.password')} />
                    <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signIn.password')} />
                </FormInputs>
            </Form>
        </Popup>
    );
};
export default PasswordRecovery;
