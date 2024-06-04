import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import OrderServiceReal from '../../api/orderService/orderSeviceReal';

interface UseOrderFeedbackProps {
    restaurantId: string;
    onReviewSubmitted: () => void;
}

interface ReviewData {
    rating: number;
    review: string;
}

export const useOrderFeedback = ({ restaurantId, onReviewSubmitted }: UseOrderFeedbackProps) => {
    const orderService = new OrderServiceReal();
    const queryClient = useQueryClient();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [filledStars, setFilledStars] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        setFilledStars(false);
    };

    const handleReviewChange = (newReview: string) => {
        setReview(newReview);
    };

    const triggerFilledStars = () => {
        setFilledStars(true);
    };

    const resetFilledStars = () => {
        setFilledStars(false);
    };

    const { mutate: submitOrderFeedback, isPending: isSubmitting } = useMutation({
        mutationFn: (data: ReviewData) => orderService.submitOrderFeedback(restaurantId, data.rating, data.review),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['restaurant', restaurantId, 'reviews'],
            });
            onReviewSubmitted();
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });

    const handleSubmitReview = () => {
        if (rating === 0) {
            triggerFilledStars();
            setTimeout(() => submitOrderFeedback({ rating, review }), 700);
        } else {
            submitOrderFeedback({ rating, review });
        }
    };

    return {
        rating,
        review,
        filledStars,
        isSubmitting,
        handleRatingChange,
        handleReviewChange,
        triggerFilledStars,
        resetFilledStars,
        handleSubmitReview,
        errorMessage,
    };
};
