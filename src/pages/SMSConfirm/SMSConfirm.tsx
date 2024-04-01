import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popups/Popup/Popup';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import styles from './SMSConfirm.module.scss';
import Button from '../../components/Button/Button';
import { StatefulPinInput } from 'react-input-pin-code';

const SMSConfirm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onSubmit = () => {};

    const inputClassName = styles.confirmation__inputs;

    const handleComplete = (values: string[]) => {
        values.reduce((prev, current) => (prev += current));
    };

    return (
        <Popup
            title={t('pages.confirmation.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            <Form name="form-confirmation" onSubmit={onSubmit}>
                <h2 className={styles.confirmation__title}>{t('pages.confirmation.subtitle')}</h2>
                <StatefulPinInput length={4} placeholder="" required={true} containerClassName={inputClassName} showState={false} autoFocus={true} onComplete={handleComplete} />
                <Button>{t('components.button.next')}</Button>
            </Form>
        </Popup>
    );
};
export default SMSConfirm;
