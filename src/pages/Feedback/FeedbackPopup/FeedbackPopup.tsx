import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../../components/Popups/Popup/Popup';
import Button from '../../../components/Button/Button';
import { Form, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './FeedbackPopup.module.scss';

function FeedbackPopup() {
    const { control } = useForm();
    const navigate = useNavigate();
    const onClose = () => {
        navigate('/');
    };
    const { t } = useTranslation();

    return (
        <Popup title={t('pages.feedback.title')} arrowBack onClose={onClose}>
            <div className={styles.feedback_popup__layout}>
                <div className={styles.feedback_popup__tel}>+7 (999) 999-99-99</div>
                <Form className={styles.feedback_popup__form} control={control}>
                    <textarea className={styles.feedback_popup__textarea} name="input" placeholder={t('pages.feedback.placeholder')} autoComplete="off" minLength={5} required wrap="soft" />
                    <Button>{t('pages.feedback.button')}</Button>
                </Form>
                <div className={styles.feedback_popup__links}>
                    <Link to='/about-us'>{t('pages.feedback.aboutUs')}</Link>
                    <div>{t('pages.feedback.preview')}</div>
                    <div>{t('pages.feedback.offerAgreement')}</div>
                    <div>{t('pages.feedback.privacyPolicy')}</div>
                </div>
            </div>
        </Popup>
    );
}

export default FeedbackPopup;
