import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './LeaveOrderFeedback.module.scss';
import Popup from '../../components/Popups/Popup/Popup';
import ReviewForm from './ReviewForm/ReviewForm';
import { useState } from 'react';

function LeaveOrderFeedback() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [rating, setRating] = useState(0);
    const [showError, setShowError] = useState(false);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        setShowError(false);
    };

    const triggerError = () => {
        setShowError(true);
    };

    const resetError = () => {
        setShowError(false);
    };

    const handleClose = () => {
        if (rating === 0) {
            triggerError();
            setTimeout(() => {
                navigate('/');
            }, 2000);
            return;
        }
        navigate('/');
    };

    return (
        <Popup onClose={handleClose}>
            <div className={styles.leave_order_feedback__layout}>
                <h3 className={styles.leave_order_feedback__subtitle}>{t('pages.leaveOrderFeedback.evaluate')}</h3>
                <ReviewForm onRatingChange={handleRatingChange} showError={showError} triggerError={triggerError} resetError={resetError} />
            </div>
        </Popup>
    );
}

export default LeaveOrderFeedback;
