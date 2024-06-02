import { useState } from 'react';
import StarRating from '../StarRating/StarRating';
import styles from './ReviewForm.module.scss';
import Button from '../../../components/Button/Button';
import { NavLink } from 'react-router-dom';
import { t } from 'i18next';

interface ReviewFormProps {
    onRatingChange: (rating: number) => void;
    showError: boolean;
    triggerError: () => void;
    resetError: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onRatingChange, showError, triggerError, resetError }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        onRatingChange(newRating);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (rating === 0) {
            triggerError();
            setTimeout(() => {
                submitReview({ rating, review });
            }, 2000);
            return;
        }
        setIsSubmitting(true);
        submitReview({ rating, review }).finally(() => setIsSubmitting(false));
    };

    const handleSkipOrClose = (event: React.MouseEvent) => {
        if (rating === 0) {
            event.preventDefault();
            triggerError();
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
            return;
        }
    };

    const submitReview = async (data: { rating: number; review: string }) => {
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            throw new Error('Error submitting review');
        }
    };

    return (
        <form className={styles.review_form} onSubmit={handleSubmit}>
            <StarRating maxRating={5} onRatingChange={handleRatingChange} showError={showError} resetError={resetError} />
            <div className={styles.review_form__input}>
                <h3 className={styles.review_form__subtitle}>{t('pages.leaveOrderFeedback.leaveFeedback')}</h3>
                <textarea className={styles.review_form__textarea} value={review} onChange={(e) => setReview(e.target.value)} placeholder="Напишите свой отзыв" maxLength={1000} />
            </div>
            <Button type="submit" disabled={isSubmitting || rating === 0}>
                Отправить
            </Button>
            <NavLink className={styles.review_form__link} to="/" onClick={handleSkipOrClose}>
                Пропустить
            </NavLink>
        </form>
    );
};

export default ReviewForm;
