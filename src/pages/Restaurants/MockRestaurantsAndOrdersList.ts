import { uniqueId } from 'lodash';
import restaurant1 from './MockImages/restaurant1.png';
import restaurant2 from './MockImages/restaurant2.png';
import restaurant3 from './MockImages/restaurant3.png';
import restaurant4 from './MockImages/restaurant4.png';
import meal1 from './MockImages/meal1.png';
import drink1 from './MockImages/drink1.png';
import dessert1 from './MockImages/dessert1.png';
import { Restaurant } from '../../utils/api/restaurantsService/restaurantsService';
import { OrderState } from '../../utils/api/orderService/orderService';

export const mockRestaurants: Restaurant[] = [
    {
        id: '1',
        photo: restaurant3,
        name: 'Jahu',
        rating: 4.8,
        address: 'ул. Березовая 21',
        workingTime: '09:00 - 22.00',
        meals: [
            {
                id: uniqueId(),
                name: 'Куриный донер',
                description: 'Лаваш, курица, соленый огурец, помидор, капуста, лук, морковь, зелень.',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [
                    {
                        id: '1',
                        name: 'Размер',
                        choices: [
                            {
                                id: '1',
                                name: 'Маленький',
                                price: 1050,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Средний',
                                price: 1350,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Большой',
                                price: 1650,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                    {
                        id: '2',
                        name: 'Соусы',
                        choices: [
                            {
                                id: '1',
                                name: 'Кетчуп',
                                price: 100,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Чесночный',
                                price: 200,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Сырный',
                                price: 300,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                    {
                        id: '3',
                        name: 'Овощи',
                        choices: [
                            {
                                id: '1',
                                name: 'Томаты',
                                price: 100,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Огурцы',
                                price: 200,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Оливки',
                                price: 300,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '4',
                                name: 'Маринованные огурцы',
                                price: 400,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '5',
                                name: 'Зелень',
                                price: 500,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: uniqueId(),
                name: 'Говяжий донер',
                description: 'Говядина',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [],
            },
            {
                id: uniqueId(),
                name: 'Американо',
                description: 'Кофе',
                photo: drink1,
                price: 200,
                type: 'drink',
                waitingTime: 5,
                features: [],
            },
            {
                id: uniqueId(),
                name: 'Говяжий донер',
                description: 'Говядина',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [],
            },
            {
                id: uniqueId(),
                name: 'Пуддинг',
                description: 'Пуддинг',
                photo: dessert1,
                price: 350,
                type: 'dessert',
                waitingTime: 5,
                features: [],
            },
        ],
        type: 'cafe',
    },
    {
        id: '2',
        photo: restaurant2,
        name: 'Boom',
        rating: 4.9,
        address: 'ул. Морозова 56/1',
        workingTime: '10:00 - 23.00',
        meals: [
            {
                id: uniqueId(),
                name: 'Куриный донер',
                description: 'Лаваш, курица, соленый огурец, помидор, капуста, лук, морковь, зелень.',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [
                    {
                        id: '1',
                        name: 'Размер',
                        choices: [
                            {
                                id: '1',
                                name: 'Маленький',
                                price: 1050,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Средний',
                                price: 1350,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Большой',
                                price: 1650,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                    {
                        id: '2',
                        name: 'Соусы',
                        choices: [
                            {
                                id: '1',
                                name: 'Кетчуп',
                                price: 100,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Чесночный',
                                price: 200,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Сырный',
                                price: 300,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                ],
            },
        ],
        type: 'cafe',
    },
    {
        id: '3',
        photo: restaurant4,
        name: 'Moon',
        rating: 5.0,
        address: 'пр. Мира 36',
        workingTime: '12:00 - 01.00',
        meals: [
            {
                id: uniqueId(),
                name: 'Американо',
                description: 'Кофе',
                photo: drink1,
                price: 200,
                type: 'drink',
                waitingTime: 5,
                features: [],
            },
        ],
        type: 'cafe',
    },
    {
        id: '4',
        photo: restaurant1,
        name: 'Ready',
        rating: 4.8,
        address: 'ул. Березовая 21',
        workingTime: '09:00 - 22.00',
        meals: [
            {
                id: uniqueId(),
                name: 'Пуддинг',
                description: 'Пуддинг',
                photo: dessert1,
                price: 350,
                type: 'dessert',
                waitingTime: 5,
                features: [],
            },
        ],
        type: 'fastFood',
    },
    {
        id: '5',
        photo: restaurant3,
        name: 'Bar',
        rating: 5.0,
        address: 'пр. Мира 36',
        workingTime: '12:00 - 01.00',
        meals: [
            {
                id: uniqueId(),
                name: 'Капуччино',
                description: 'Кофе',
                photo: drink1,
                price: 1,
                type: 'drink',
                waitingTime: 5,
                features: [],
            },
        ],
        type: 'cafeBar',
    },
];

export const mockOrders: { orders: OrderState[] } = {
    orders: [
        {
            userId: 'u12345',
            id: 'NHG347',
            totalAmount: 4100,
            preparationStatus: 'confirmed',
            preparationTime: 2,
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
                        features: [],
                    },
                    quantity: 1,
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
                        features: [],
                    },
                    quantity: 3,
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
                        features: [],
                    },
                    quantity: 1,
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
                        features: [],
                    },
                    quantity: 1,
                },
            ],
        },
    ],
}
