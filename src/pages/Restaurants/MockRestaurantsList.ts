import image1 from './MockImages/image1.png';
import image2 from './MockImages/image2.png';
import image3 from './MockImages/image3.png';

export type Restaurant = {
    id: string;
    photo: string;
    name: string;
    rating: number;
    address: string;
    workingTime: string;
    meals: Meal[];
    type: 'fastFood' | 'cafe' | 'cafeBar';
};

export type Meal = {
    id: string;
    name: string;
    photo: string;
    price: number;
    type: 'food' | 'drink' | 'dessert';
    features?: Features;
};

export const mockRestaurants: Restaurant[] = [
    {
        id: '1',
        photo: image1,
        name: 'Jahu',
        rating: 4.8,
        address: 'ул. Березовая 21',
        workingTime: '09:00 - 22.00',
        meals: [
            {
                id: '1',
                name: 'Брауни',
                photo: '',
                price: 1,
                type: 'dessert',
            },
        ],
        type: 'cafe',
    },
    {
        id: '2',
        photo: image2,
        name: 'Boom',
        rating: 4.9,
        address: 'ул. Морозова 56/1',
        workingTime: '10:00 - 23.00',
        meals: [
            {
                id: '1',
                name: 'Брауни с мороженым',
                photo: '',
                price: 1,
                type: 'dessert',
            },
        ],
        type: 'cafe',
    },
    {
        id: '3',
        photo: image3,
        name: 'Moon',
        rating: 5.0,
        address: 'пр. Мира 36',
        workingTime: '12:00 - 01.00',
        meals: [
            {
                id: '1',
                name: 'Сырники без глютена',
                photo: '',
                price: 1,
                type: 'food',
            },
        ],
        type: 'cafe',
    },
    {
        id: '4',
        photo: image1,
        name: 'Jahu',
        rating: 4.8,
        address: 'ул. Березовая 21',
        workingTime: '09:00 - 22.00',
        meals: [
            {
                id: '1',
                name: 'Пирог без глютена',
                photo: '',
                price: 1,
                type: 'food',
            },
        ],
        type: 'fastFood',
    },
    {
        id: '5',
        photo: image3,
        name: 'Moon',
        rating: 5.0,
        address: 'пр. Мира 36',
        workingTime: '12:00 - 01.00',
        meals: [
            {
                id: '1',
                name: 'Капуччино',
                photo: '',
                price: 1,
                type: 'drink',
            },
        ],
        type: 'cafeBar',
    },
];
