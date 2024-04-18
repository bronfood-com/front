/**
 * Describes the details of a specific item in an order.
 * @interface
 * @property {string} id - Unique identifier for the item.
 * @property {string} itemDescription - Description of the item.
 * @property {number} itemPrice - Price per item.
 * @property {number} quantity - Number of units of the item ordered.
 */
export interface OrderDetails {
    id: string;
    itemDescription: string;
    itemPrice: number;
    quantity: number;
}

/**
 * Describes the state of an order.
 * @interface
 * @property {string} clientId - Unique identifier for the client.
 * @property {string} id - Unique identifier for the order.
 * @property {OrderDetails[]} orderDetails - Array with details of items in the order.
 * @property {number} totalAmount - Total amount of the order.
 * @property {'waiting' | 'confirmed' | 'notConfirmed'} confirmationStatus - Confirmation status of the order.
 * @property {'waiting' | 'paid' | 'failed'} paymentStatus - Payment status of the order.
 * @property {'waiting' | 'reviewed' | 'skipped'} reviewStatus - Review status of the order.
 * @property {number} cancellationTime - Time of order cancellation in seconds.
 * @property {'none' | 'requested' | 'confirmed'} cancellationStatus - Cancellation status of the order.
 * @property {boolean} isCancellationRequested - Flag indicating whether a cancellation was requested for the order.
 * @property {number} preparationTime - Time required to prepare the order, in minutes.
 */
export interface OrderState {
    clientId: string;
    id: string;
    totalAmount: number;
    confirmationStatus: string;
    preparationTime: number;
    paymentStatus: string;
    reviewStatus: string;
    cancellationTime: number;
    cancellationStatus: string;
    isCancellationRequested: boolean;
    orderDetails: OrderDetails[];
}

// export interface OrderState {
//     clientId: string;
//     id: string;
//     totalAmount: number;
//     confirmationStatus: 'waiting' | 'confirmed' | 'notConfirmed';
//     preparationTime: number;
//     paymentStatus: 'waiting' | 'paid' | 'failed';
//     reviewStatus: 'waiting' | 'reviewed' | 'skipped';
//     cancellationTime: number;
//     cancellationStatus: 'none' | 'requested' | 'confirmed';
//     isCancellationRequested: boolean;
//     orderDetails: OrderDetails[];
// }
