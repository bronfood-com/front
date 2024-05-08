import { OrderState } from '../../utils/api/orderService/orderService';

export const mockData: { orders: OrderState[] } = {
    orders: [
        {
            userId: 'u12345',
            id: 'NHG347',
            totalAmount: 4100,
            confirmationStatus: 'waiting',
            preparationTime: 7,
            paymentStatus: 'paid',
            reviewStatus: 'waiting',
            cancellationTime: 120,
            cancellationStatus: 'none',
            isCancellationRequested: false,
            orderedMeal: [
                {
                    orderedMeal: {
                        id: '1',
                        name: 'Куриный донер',
                        description: 'Вкусный куриный донер с овощами',
                        photo: 'url_to_photo',
                        price: 1300,
                        type: 'food',
                        waitingTime: 10,
                        features: []
                    },
                    quantity: 1
                },
                {
                    orderedMeal: {
                        id: '2',
                        name: 'Coffee',
                        description: 'Свежесваренный кофе',
                        photo: 'url_to_photo',
                        price: 500,
                        type: 'drink',
                        waitingTime: 5,
                        features: []
                    },
                    quantity: 3
                },
                {
                    orderedMeal: {
                        id: '3',
                        name: 'Салат Цезарь с курицей и сухариками',
                        description: 'Классический салат Цезарь',
                        photo: 'url_to_photo',
                        price: 2000,
                        type: 'food',
                        waitingTime: 7,
                        features: []
                    },
                    quantity: 1
                },
                {
                    orderedMeal: {
                        id: '4',
                        name: 'Вода негазированная',
                        description: 'Охлажденная вода без добавок',
                        photo: 'url_to_photo',
                        price: 300,
                        type: 'drink',
                        waitingTime: 0,
                        features: []
                    },
                    quantity: 1
                }
            ],
        },
        // Для второго заказа данные аналогичны
    ],
};
