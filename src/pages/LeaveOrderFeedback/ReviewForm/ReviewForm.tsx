import React from 'react';
import styles from './ReviewForm.module.scss';
import Button from '../../../components/Button/Button';
import { t } from 'i18next';
import StarRating from '../StarRating/StarRating';

interface ReviewFormProps {
    rating: number;
    review: string;
    onRatingChange: (rating: number) => void;
    onReviewChange: (review: string) => void;
    filledStars: boolean;
    triggerFilledStars: () => void;
    resetFilledStars: () => void;
    onSubmit: () => void;
    onSkipOrClose: () => void;
    isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ rating, review, onRatingChange, onReviewChange, filledStars, resetFilledStars, onSubmit, onSkipOrClose, isSubmitting }) => {
    const handleRatingChange = (newRating: number) => {
        onRatingChange(newRating);
    };

    const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onReviewChange(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form className={styles.review_form} onSubmit={handleSubmit}>
            <StarRating maxRating={5} onRatingChange={handleRatingChange} filledStars={filledStars} resetFilledStars={resetFilledStars} />
            <div className={styles.review_form__input}>
                <h3 className={styles.review_form__subtitle}>{t('pages.leaveOrderFeedback.leaveFeedback')}</h3>
                <textarea className={styles.review_form__textarea} value={review} onChange={handleReviewChange} placeholder="Напишите свой отзыв" maxLength={1000} />
            </div>
            <Button type="submit" disabled={isSubmitting || (rating === 0 && review === '')}>
                Отправить
            </Button>
            <div className={styles.review_form__skip_button_wrapper}>
                <button className={styles.review_form__skip_button} type="button" onClick={onSkipOrClose}>
                    Пропустить
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
