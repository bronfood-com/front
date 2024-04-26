import { useTranslation } from 'react-i18next';
import Popup from '../Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import styles from './SMSVerify.module.scss';
import Button from '../Button/Button';
import { PinInput } from 'react-input-pin-code';
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
    onSubmit: () => void;
    /**
     * This object contains methods for registering components into React Hook Form.
     */
    control?: Control<FieldValues>;
    /**
     * Values of pinInput
     */
    values: string[];
    /**
     * Setter for confirmationCode state
     */
    setCode: (values: string[]) => void;
}

const SMSVerify: FC<SMSVerify> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showError, setShowError] = useState<boolean>(false);

    const handleCompleteCode = (value: string | string[], index: number, values: string[]) => {
        setShowError(false);
        if (values.length === 4) {
            props.setCode(values);
        }
    };

    const onSubmit = () => {
        if (props.values.join('').length !== 4) {
            setShowError(true);
        } else {
            props.onSubmit();
        }
    };

    const valTest = ['[0-9]'];
    return (
        <Popup
            title={t('pages.confirmation.enterSmsCode')}
            onClose={() => {
                navigate('/');
            }}
        >
            <div className={styles.SMSVerify__layout}>
                <Form
                    control={props.control}
                    name="form-confirmation"
                    onSubmit={onSubmit}
                    onError={() => {
                        alert('error');
                    }}
                >
                    <PinInput values={props.values} name="PinInput" placeholder="" required={true} containerClassName={styles.SMSVerify__inputs} showState={showError} autoFocus={true} onChange={handleCompleteCode} validate={valTest} />
                    <Button>{t('components.button.next')}</Button>
                </Form>
            </div>
        </Popup>
    );
};
export default SMSVerify;
