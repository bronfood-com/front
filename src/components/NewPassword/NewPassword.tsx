import Popup from '../Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import { Form, FieldErrors, FieldValues, UseFormRegister, Control, SubmitHandler } from 'react-hook-form';
import FormInputs from '../FormInputs/FormInputs';
import InputPassword from '../InputPassword/InputPassword';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import Button from '../Button/Button';

interface NewPassword {
    /**
     * Method to register input
     */
    register: UseFormRegister<FieldValues>;
    /**
     * React Hook Forms error object
     */
    errors: FieldErrors;
    /**
     * This object contains methods for registering components into React Hook Form.
     */
    control: Control<FieldValues>;
    /**
     * Submit form action
     */
    onSubmit: SubmitHandler<FieldValues>;
}

const NewPassword: FC<NewPassword> = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Popup
            title={t('pages.newPassword.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            <Form control={props.control} name="form-restore-password" onSubmit={props.onSubmit}>
                <FormInputs>
                    <InputPassword register={props.register} errors={props.errors} name="password" nameLabel={t('pages.newPassword.nameLabel')} />
                    <InputPassword register={props.register} errors={props.errors} name="password_confirm" nameLabel={t('pages.newPassword.nameLabelRepeat')} />
                    <Button>{t('pages.newPassword.button')}</Button>
                </FormInputs>
            </Form>
        </Popup>
    );
};

export default NewPassword;
