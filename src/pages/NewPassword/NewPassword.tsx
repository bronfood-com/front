import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { regexPassword } from '../../utils/consts';

const NewPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        navigate('/password_done');

    };

    return (
        <Popup title={t('pages.newPassword.title')}>
            <Form name="form-password-new" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                    <Input type="text" name="newPassword" placeholder="123456" nameLabel={t('pages.newPassword.nameLabel')}  register={register} errors={errors} pattern={regexPassword}></Input>
                    <Input type="text" name="newPasswordDouble" placeholder="123456" nameLabel={t('pages.newPassword.nameLabelRepeat')}  register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>
                <Button>{t('pages.newPassword.button')}</Button>
            </Form>
        </Popup>
    );
};

export default NewPassword;
