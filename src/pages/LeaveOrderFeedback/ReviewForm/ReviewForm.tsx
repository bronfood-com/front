import { useState } from 'react';
import StarRating from '../StarRating/StarRating';
import styles from './ReviewForm.module.scss';
import Button from '../../../components/Button/Button';
import { NavLink } from 'react-router-dom';
import { t } from 'i18next';

const ReviewForm: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        submitReview({ rating, review });
    };

    const submitReview = async (data: { rating: number, review: string }) => {
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
            throw new Error('Error:');
        }
    };

    return (
        <form className={styles.review_form} onSubmit={handleSubmit}>
            <StarRating maxRating={5} onRatingChange={handleRatingChange} />
            <div className={styles.review_form__input}>
                <h3 className={styles.review_form__subtitle}>{t('pages.leaveOrderFeedback.leaveFeedback')}</h3>
                <textarea className={styles.review_form__textarea} value={review} onChange={(e) => setReview(e.target.value)} placeholder="Напишите свой отзыв" />
            </div>
            <Button>Отправить</Button>
            <NavLink className={styles.review_form__link} to="/">
                Пропустить
            </NavLink>
        </form>
    );
};

export default ReviewForm;
