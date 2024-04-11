export interface OrderDetails {
    id: string;
    itemDescription: string;
    itemPrice: number;
    quantity: number;
}

export interface OrderState {
    clientId: string;
    id: string;
    orderDetails: OrderDetails[];
    totalAmount: number;
    confirmationStatus: 'waiting' | 'confirmed' | 'notConfirmed';
    paymentStatus: 'waiting' | 'paid' | 'failed';
    reviewStatus: 'waiting' | 'reviewed' | 'skipped';
    cancellationTime: number;
    cancellationStatus: 'none' | 'requested' | 'confirmed';
    isCancellationRequested: boolean;
    preparationTime: number;
}
