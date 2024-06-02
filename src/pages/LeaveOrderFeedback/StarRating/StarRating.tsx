import React, { useState, useEffect } from 'react';
import styles from './StarRating.module.scss';
import starGreyImg from '../../../vendor/images/icons/star-grey.svg';
import starOrangeImg from '../../../vendor/images/icons/star-orange.svg';
import starRedImg from '../../../vendor/images/icons/star-red.svg';

interface RatingProps {
    maxRating: number;
    onRatingChange: (rating: number) => void;
    showError: boolean;
    resetError: () => void;
}

const StarRating: React.FC<RatingProps> = ({ maxRating, onRatingChange, showError, resetError }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [redStars, setRedStars] = useState<number[]>([]);

    useEffect(() => {
        if (showError) {
            const timeouts: NodeJS.Timeout[] = [];
            for (let i = 1; i <= maxRating; i++) {
                const timeout = setTimeout(() => {
                    setRedStars((prev) => [...prev, i]);
                }, i * 200);
                timeouts.push(timeout);
            }
            const clearRedStarsTimeout = setTimeout(
                () => {
                    setRedStars([]);
                    resetError();
                },
                maxRating * 200 + 1000
            );

            return () => {
                timeouts.forEach(clearTimeout);
                clearTimeout(clearRedStarsTimeout);
            };
        }
    }, [showError, maxRating, resetError]);

    const handleClick = (ratingValue: number) => {
        setRating(ratingValue);
        onRatingChange(ratingValue);
    };

    const handleMouseOver = (ratingValue: number) => {
        setHoverRating(ratingValue);
    };

    const handleMouseOut = () => {
        setHoverRating(0);
    };

    return (
        <div className={styles.starRating}>
            {Array.from({ length: maxRating }, (_, index) => index + 1).map((star) => (
                <div key={star} className={styles.starRating__star} onClick={() => handleClick(star)} onMouseOver={() => handleMouseOver(star)} onMouseOut={handleMouseOut}>
                    <img src={starGreyImg} alt={`Grey Star ${star}`} className={styles.starRating__img} />
                    <img src={starOrangeImg} alt={`Orange Star ${star}`} className={`${styles.starRating__img} ${styles.starRating__img_filled}`} style={{ opacity: star <= (hoverRating || rating) ? 1 : 0 }} />
                    {redStars.includes(star) && <img src={starRedImg} alt={`Red Star ${star}`} className={`${styles.starRating__img} ${styles.starRating__img_error}`} />}
                </div>
            ))}
        </div>
    );
};

export default StarRating;
