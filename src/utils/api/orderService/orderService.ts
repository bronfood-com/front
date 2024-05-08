import { Meal } from '../restaurantsService/restaurantsService';

export interface OrderedMeal {
    /** Ordered Meal type */
    orderedMeal: Meal;

    /** Number of units of the item ordered */
    quantity: number;
}

export interface OrderState {
    /** Unique identifier for the client */
    userId: string;

    /** Time to wait orderId */
    waitOrderIdTime: number;

    /** Unique identifier for the order */
    id: string;

    /** Total amount of the order */
    totalAmount: number;

    /** Confirmation status of the order */
    preparationStatus: 'waiting' | 'confirmed' | 'notConfirmed';

    /** Time required to prepare the order, in minutes */
    preparationTime: number;

    /** Payment status of the order */
    paymentStatus: string;

    /** Review status of the order */
    reviewStatus: 'waiting' | 'reviewed' | 'skipped';

    /** Time of order cancellation in seconds */
    cancellationTime: number;

    /** Cancellation status of the order */
    cancellationStatus: 'none' | 'requested' | 'confirmed';

    /** Flag indicating whether a cancellation was requested for the order */
    isCancellationRequested: boolean;

    /** Array with details of items in the order */
    orderedMeal: OrderedMeal[];
}
