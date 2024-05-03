import { FC } from 'react';
import Popup from '../../../components/Popups/Popup/Popup';
import { Form, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputPhone from '../../../components/InputPhone/InputPhone';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './QueryPhone.module.scss';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

interface QueryPhone {
    /**
     * Submit form action
     */
    onSubmit: (PhoneNumber: string) => void;
    /**
     * Flag that determines whether to show or not to show the error
     */
    isErrorVisible: boolean;
    /**
     * Error message
     */
    error: string;
    /**
     * Callback that clear error message
     */
    clearError: () => void;
}

const QueryPhone: FC<QueryPhone> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        register,
        formState: { errors },
        control,
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (formFields) => {
        const mappedPhoneNumber = formFields.data.phoneNumber.replace(/\D/g, '');
        if (mappedPhoneNumber !== '' && mappedPhoneNumber.length > 10) {
            props.onSubmit(mappedPhoneNumber);
        }
    };

    return (
        <Popup
            title={t('pages.passwordRecovery.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            <div className={styles.query_phone__layout}>
                <>
                    {props.isErrorVisible && <ErrorMessage message={t(`pages.passwordRecovery.${props.error}`)} />}
                    <Form control={control} name="phoneNumber" onSubmit={onSubmit} onSuccess={props.clearError}>
                        <InputPhone errors={errors} register={register} clearError={props.clearError} />
                        <Button>{t('pages.passwordRecovery.continue')}</Button>
                    </Form>
                </>
            </div>
        </Popup>
    );
};

export default QueryPhone;
