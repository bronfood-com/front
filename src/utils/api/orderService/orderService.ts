export interface OrderedMeal {
    /**
     * Meal's id
     */
    id: string;
    /**
     * Meal's name
     */
    name: string;
    /**
     * Meal's type
     */
    price: number;
    /**
     * Number of units of the item ordered
     */
    quantity: number;
}

/**
 * Describes the state of an order.
 * @interface
 * @property {string} clientId - Unique identifier for the client.
 * @property {string} id - Unique identifier for the order.
 * @property {OrderedMeal[]} orderedMeal - Array with details of items in the order.
 * @property {number} totalAmount - Total amount of the order.
 * @property {'waiting' | 'confirmed' | 'notConfirmed'} confirmationStatus - Confirmation status of the order.
 * @property {'waiting' | 'reviewed' | 'skipped'} reviewStatus - Review status of the order.
 * @property {number} cancellationTime - Time of order cancellation in seconds.
 * @property {'none' | 'requested' | 'confirmed'} cancellationStatus - Cancellation status of the order.
 * @property {boolean} isCancellationRequested - Flag indicating whether a cancellation was requested for the order.
 * @property {number} preparationTime - Time required to prepare the order, in minutes.
 */

export interface OrderState {
    userId: string;
    id: string;
    totalAmount: number;
    confirmationStatus: 'waiting' | 'confirmed' | 'notConfirmed';
    preparationTime: number;
    paymentStatus: string;
    reviewStatus: string;
    cancellationTime: number;
    cancellationStatus: string;
    isCancellationRequested: boolean;
    orderedMeal: OrderedMeal[];
}
