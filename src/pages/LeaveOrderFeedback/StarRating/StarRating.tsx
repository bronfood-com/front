import React, { useState } from 'react';
import styles from './StarRating.module.scss';
import starGreyImg from '../../../vendor/images/icons/star-grey.svg';
import starOrangeImg from '../../../vendor/images/icons/star-orange.svg';

interface RatingProps {
    maxRating: number;
    onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<RatingProps> = ({ maxRating, onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

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
                </div>
            ))}
        </div>
    );
};

export default StarRating;
