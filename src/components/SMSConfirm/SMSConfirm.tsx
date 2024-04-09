import { useTranslation } from 'react-i18next';
import Popup from '../Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import styles from './SMSConfirm.module.scss';
import Button from '../Button/Button';
import { StatefulPinInput } from 'react-input-pin-code';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface SMSConfirm {
    /**
     * Open loading spinner
     */
    isLoading: boolean;
    /**
     * Error message
     */
    error: string | null;
    /**
     * Create error message
     */
    isConfirmErrorVisible: boolean;
    /**
     * Submit function
     */
    onSubmit: () => void;
    /**
     * Set code from inputs
     */
    getCode: (arg: string) => void;

    /**
     * Open info sucessfull popup
     */
    isInfoPopupOpen?: boolean;
    /**
     * Opening popup
     */
    popupSuccessOpened?: React.ReactNode;
}

const SMSConfirm: FC<SMSConfirm> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { handleSubmit } = useForm();
    const inputClassName = styles.confirmation__inputs;

    const onSubmit = () => {
        props.onSubmit();
    };

    const handleCompleteCode = (values: string[]) => {
        const code = values.reduce((prev, current) => (prev += current));
        props.getCode(code);
    };

    return (
        <>
            {props.isInfoPopupOpen ? (
                props.popupSuccessOpened
            ) : (
                <Popup
                    title={t('pages.confirmation.phoneConfirmation')}
                    onClose={() => {
                        navigate('/');
                    }}
                >
                    {props.isLoading && <Preloader />}

                    <Form name="form-confirmation" onSubmit={handleSubmit(onSubmit)}>
                        {props.isConfirmErrorVisible && <ErrorMessage message={t(`pages.confirmation.${props.error}`)} />}
                        <h2 className={styles.confirmation__title}>{t('pages.confirmation.enterSmsCode')}</h2>
                        <StatefulPinInput length={4} placeholder="" required={true} containerClassName={inputClassName} showState={false} autoFocus={true} onComplete={handleCompleteCode} />
                        <Button disabled={props.isLoading}>{t('components.button.next')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};
export default SMSConfirm;
