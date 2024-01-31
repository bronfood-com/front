import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './PasswordRecovery.module.scss';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import InputPhone from '../../components/InputPhone/InputPhone';
import Preloader from '../../components/Preloader/Preloader';

const PasswordRecovery = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onSubmit = () => {
        setIsLoading(true);
        navigate('/new_pass');
        setIsLoading(false);

    };
    return (
        <Popup title={t('pages.passwordRecovery.title')}>
             {isLoading && <Preloader />}
            <Form name="form-password-recovery" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.form__field} disabled={isLoading}>
                <FormInputs>
                    <InputPhone register={register} errors={errors}></InputPhone>
                </FormInputs>
                </fieldset>
                <Button disabled={isLoading}>{t('pages.passwordRecovery.continue')}</Button>
            </Form>
        </Popup>
    );
};

export default PasswordRecovery;
