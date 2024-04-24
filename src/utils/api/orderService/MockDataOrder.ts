import { OrderState } from './orderService';

export const mockData: { orders: OrderState[] } = {
    orders: [
        {
            clientId: 'clientId1',
            id: 'NHG347',
            totalAmount: 4100,
            confirmationStatus: 'waiting',
            preparationTime: 11,
            paymentStatus: 'paid',
            reviewStatus: 'waiting',
            cancellationTime: 120,
            cancellationStatus: 'none',
            isCancellationRequested: false,
            orderedMeal: [
                { id: '1', name: 'Куриный донер', price: 1300, quantity: 1 },
                { id: '2', name: 'Coffee', price: 500, quantity: 3 },
                { id: '3', name: 'Салат Цезарь с курицей и сухариками', price: 2000, quantity: 1 },
                { id: '4', name: 'Вода негазированная', price: 300, quantity: 1 },
            ],
        },
        {
            clientId: 'clientId2',
            id: 'NHG348',
            totalAmount: 5800,
            confirmationStatus: 'waiting',
            preparationTime: 5,
            paymentStatus: 'paid',
            reviewStatus: 'waiting',
            cancellationTime: 4,
            cancellationStatus: 'none',
            isCancellationRequested: false,
            orderedMeal: [
                { id: '1', name: 'Куриный донер', price: 1300, quantity: 1 },
                { id: '2', name: 'Coffee', price: 500, quantity: 3 },
                { id: '3', name: 'Салат Цезарь с курицей и сухариками', price: 2000, quantity: 1 },
                { id: '4', name: 'Вода негазированная', price: 300, quantity: 1 },
            ],
        },
    ],
};
