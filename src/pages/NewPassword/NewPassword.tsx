import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import InputPassword from '../../components/InputPassword/InputPassword';

const NewPassword = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/password_done');
    };
    return (
        <Popup title={t('pages.newPassword.title')}>
            <Form name="form-password-new" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                    <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.newPassword.nameLabel')} />
                    <InputPassword register={register} errors={errors} name="newPasswordDouble" nameLabel={t('pages.newPassword.nameLabelRepeat')} />
                </FormInputs>
                <Button>{t('pages.newPassword.button')}</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
