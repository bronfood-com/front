import { useTranslation } from 'react-i18next';
import Popup from '../Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import styles from './SMSVerify.module.scss';
import Button from '../Button/Button';
import { StatefulPinInput } from 'react-input-pin-code';
import { FC } from 'react';
import { Form, FieldValues, Control, SubmitHandler, FieldErrors } from 'react-hook-form';

interface SMSVerify {
    /**
     * Error message
     */
    errors: FieldErrors;
    /**
     * Is called when the user submits the code.
     */
    onSubmit: SubmitHandler<FieldValues>;
    /**
     * This object contains methods for registering components into React Hook Form.
     */
    control?: Control<FieldValues>;
}

const SMSVerify: FC<SMSVerify> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const inputClassName = styles.confirmation__inputs;

    const handleCompleteCode = (values: string[]) => {
        const code = values.reduce((prev, current) => (prev += current));
        localStorage.setItem('confirmation_code', code);
    };

    return (
        <Popup
            title={t('pages.confirmation.enterSmsCode')}
            onClose={() => {
                navigate('/');
            }}
        >
            <Form control={props.control} name="form-confirmation" onSubmit={props.onSubmit}>
                <StatefulPinInput length={4} placeholder="" required={true} containerClassName={inputClassName} showState={false} autoFocus={true} onComplete={handleCompleteCode} />
                <Button>{t('components.button.next')}</Button>
            </Form>
        </Popup>
    );
};
export default SMSVerify;
