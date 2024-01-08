import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import InputPhone from '../../components/InputPhone/InputPhone';

const PasswordRecovery = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/new_pass');
    };
    return (
        <Popup title={t('pages.passwordRecovery.title')}>
            <Form name="form-password-recovery" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                <InputPhone register={register} errors={errors}></InputPhone>
                </FormInputs>
                <Button>{t('pages.passwordRecovery.continue')}</Button>
            </Form>
        </Popup>
    );
};

export default PasswordRecovery;
