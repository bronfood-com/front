import Popup from '../../../components/Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import { Form, FieldErrors, FieldValues, UseFormRegister, Control, SubmitHandler } from 'react-hook-form';
import FormInputs from '../../../components/FormInputs/FormInputs';
import InputPassword from '../../../components/InputPassword/InputPassword';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import Button from '../../../components/Button/Button';

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
    /**
     *
     * Method will watch specified inputs and return their values
     */
    watch: (names?: string | string[]) => unknown;
}

const NewPassword: FC<NewPassword> = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const validatePasswords = (value: FieldValues): string | boolean => {
        if (props.watch('password') != value) {
            return t('pages.newPassword.passwordDontMatch');
        }
        return true;
    };

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
                    <InputPassword register={props.register} errors={props.errors} name="password_confirm" nameLabel={t('pages.newPassword.nameLabelRepeat')} validate={validatePasswords} />
                    <Button>{t('pages.newPassword.button')}</Button>
                </FormInputs>
            </Form>
        </Popup>
    );
};

export default NewPassword;
