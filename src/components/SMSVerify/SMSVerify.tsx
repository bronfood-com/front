import { useTranslation } from 'react-i18next';
import Popup from '../Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import styles from './SMSVerify.module.scss';
import Button from '../Button/Button';
import { StatefulPinInput } from 'react-input-pin-code';
import { FC, useState } from 'react';
import { Form, FieldValues, Control, FieldErrors } from 'react-hook-form';

interface SMSVerify {
    /**
     * Error message
     */
    errors: FieldErrors;
    /**
     * Is called when the user submits the code.
     */
    onSubmit: (code: string) => void;
    /**
     * This object contains methods for registering components into React Hook Form.
     */
    control?: Control<FieldValues>;
}

const SMSVerify: FC<SMSVerify> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [confirmationCode, setConfirmationCode] = useState<string>('');

    const handleCompleteCode = (value: string | string[], index: number, values: string[]) => {
        if (values.length === 4) {
            const code = values.join('');
            setConfirmationCode(code);
        }
    };

    const onSubmit = () => {
        props.onSubmit(confirmationCode);
    };

    return (
        <Popup
            title={t('pages.confirmation.enterSmsCode')}
            onClose={() => {
                navigate('/');
            }}
        >
            <div className={styles.SMSVerify__layout}>
                <Form control={props.control} name="form-confirmation" onSubmit={onSubmit}>
                    <StatefulPinInput name="PinInput" length={4} placeholder="" required={true} containerClassName={styles.SMSVerify__inputs} showState={false} autoFocus={true} onChange={handleCompleteCode} />
                    <Button>{t('components.button.next')}</Button>
                </Form>
            </div>
        </Popup>
    );
};
export default SMSVerify;
