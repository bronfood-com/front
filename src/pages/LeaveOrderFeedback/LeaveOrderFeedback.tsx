import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './LeaveOrderFeedback.module.scss';
import Popup from '../../components/Popups/Popup/Popup';
import ReviewForm from './ReviewForm/ReviewForm';

function LeaveOrderFeedback() {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/');
    };
    const { t } = useTranslation();

    return (
        <Popup onClose={handleClose}>
            <div className={styles.leave_order_feedback__layout}>
                <h3 className={styles.leave_order_feedback__subtitle}>{t('pages.leaveOrderFeedback.evaluate')}</h3>
                <ReviewForm />
            </div>
        </Popup>
    );
}

export default LeaveOrderFeedback;
