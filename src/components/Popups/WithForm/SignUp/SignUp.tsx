import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Button/Button';
import Form from '../../../Form/Form';
import FormInputs from '../../../FormInputs/FormInputs';
import Input from '../../../Input/Input';
import Popup from '../../Popup/Popup';
import { regexPassword, regexClientName } from '../../../../utils/consts';
import InputPhone from '../../../InputPhone/InputPhone';
import { useTranslation } from 'react-i18next';
import { authApi } from '../../../../utils/api/auth';

const SignUp = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { input_password, input_telephone, input_username } = data;
        const res = await authApi.register({ phone: input_telephone, password: input_password, name: input_username, isOwner: false });
        console.log(res)
        if (res.errorMessage) return;

        navigate('/signup_done');
    };

    return (
        <Popup title={t('auth.regLink')}>
            <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                    <Input type="text" name="input_username" placeholder={t('auth.namePlaceholder')} nameLabel={t('auth.nameInput')} register={register} errors={errors} pattern={regexClientName}></Input>
                    <InputPhone register={register} errors={errors}></InputPhone>
                    <Input type="password" name="input_password" placeholder="******" nameLabel={t('auth.passwordInput')} register={register} errors={errors} pattern={regexPassword}></Input>
                </FormInputs>
                <Button>{t('auth.regLink')}</Button>
            </Form>
        </Popup>
    );
};

export default SignUp;
