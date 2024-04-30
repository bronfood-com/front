import { FC } from 'react';
import Popup from '../../../components/Popups/Popup/Popup';
import { Form, UseFormRegister, FieldValues, FieldErrors, SubmitHandler, Control } from 'react-hook-form';
import InputPhone from '../../../components/InputPhone/InputPhone';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './QueryPhone.module.scss';

interface QueryPhone {
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

const QueryPhone: FC<QueryPhone> = (props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Popup
            title={t('pages.passwordRecovery.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            <div className={styles.query_phone__layout}>
                <Form control={props.control} name="phoneNumber" onSubmit={props.onSubmit}>
                    <InputPhone errors={props.errors} register={props.register} />
                    <Button>{t('pages.passwordRecovery.continue')}</Button>
                </Form>
            </div>
        </Popup>
    );
};

export default QueryPhone;
