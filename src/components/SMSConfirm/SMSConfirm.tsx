import { useTranslation } from 'react-i18next';
import Popup from '../Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import styles from './SMSConfirm.module.scss';
import Button from '../Button/Button';
import { StatefulPinInput } from 'react-input-pin-code';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { FC, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import PopupSignupSuccess from '../../pages/SignUp/PopupSignupSuccess/PopupSignupSuccess';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface SMSConfirm {
    /**
     * Parent page for this confirm modal
     */
    parentPage: 'signup' | 'profile';
}

const SMSConfirm: FC<SMSConfirm> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { handleSubmit } = useForm();
    const inputClassName = styles.confirmation__inputs;
    const [code, setCode] = useState('');
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const { confirmSignUp, confirmUpdateUser } = useCurrentUser();
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        if (props.parentPage === 'signup') {
            const result = await confirmSignUp.mutation(code);
            if (result !== null) {
                setIsErrorVisible(true);
            }
            setIsInfoPopupOpen(true);
        } else if (props.parentPage === 'profile') {
            const result = await confirmUpdateUser.mutation(code);
            if (result !== null) {
                setIsErrorVisible(true);
            }
            navigate('/');
        }
    };

    const handleComplete = (values: string[]) => {
        const getCode = values.reduce((prev, current) => (prev += current));
        setCode(getCode);
    };

    return (
        <>
            {isInfoPopupOpen ? (
                <PopupSignupSuccess isOpened={isInfoPopupOpen}></PopupSignupSuccess>
            ) : (
                <Popup
                    title={t('pages.confirmation.phoneConfirmation')}
                    onClose={() => {
                        navigate('/');
                    }}
                >
                    {(confirmSignUp.isLoading || confirmUpdateUser.isLoading) && <Preloader />}

                    <Form name="form-confirmation" onSubmit={handleSubmit(onSubmit)}>
                        {isErrorVisible && (confirmSignUp.errorMessage || confirmUpdateUser.errorMessage) && <ErrorMessage message={t(`pages.confirmation.${confirmSignUp.errorMessage || confirmUpdateUser.errorMessage}`)} />}
                        <h2 className={styles.confirmation__title}>{t('pages.confirmation.enterSmsCode')}</h2>
                        <StatefulPinInput length={4} placeholder="" required={true} containerClassName={inputClassName} showState={false} autoFocus={true} onComplete={handleComplete} />
                        <Button disabled={confirmSignUp.isLoading || confirmUpdateUser.isLoading}>{t('components.button.next')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};
export default SMSConfirm;
