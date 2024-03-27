import restaurant1 from './MockImages/restaurant1.png';
import restaurant2 from './MockImages/restaurant2.png';
import restaurant3 from './MockImages/restaurant3.png';
import restaurant4 from './MockImages/restaurant4.png';
import meal1 from './MockImages/meal1.png';
import drink1 from './MockImages/drink1.png';
import dessert1 from './MockImages/dessert1.png';
import { Restaurant } from '../../utils/api/restaurantsService/restaurantsService';

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
                id: '1',
                name: 'Куриный донер',
                photo: meal1,
                price: 1350,
                type: 'food',
            },
            {
                id: '2',
                name: 'Говяжий донер',
                photo: meal1,
                price: 1350,
                type: 'food',
            },
            {
                id: '3',
                name: 'Куриный донер',
                photo: meal1,
                price: 1350,
                type: 'food',
            },
            {
                id: '4',
                name: 'Американо',
                photo: drink1,
                price: 200,
                type: 'drink',
            },
            {
                id: '5',
                name: 'Говяжий донер',
                photo: meal1,
                price: 1350,
                type: 'food',
            },
            {
                id: '6',
                name: 'Пуддинг',
                photo: dessert1,
                price: 350,
                type: 'dessert',
            },
            {
                id: '7',
                name: 'Куриный донер',
                photo: meal1,
                price: 1350,
                type: 'food',
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
        photo: restaurant4,
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
        photo: restaurant1,
        name: 'Ready',
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
        photo: restaurant3,
        name: 'Bar',
        rating: 5.0,
        address: 'пр. Мира 36',
        workingTime: '12:00 - 01.00',
        meals: [
            {
                id: '1',
                name: 'Капуччино',
                photo: drink1,
                price: 1,
                type: 'drink',
            },
        ],
        type: 'cafeBar',
    },
];

const increment = (function (n) {
    return function () {
        n += 1;
        return n;
    };
})(0);

export const options = mockRestaurants
    .map(({ meals, name }) => {
        return meals.map((meal) => {
            return [
                { id: increment(), name: meal.name },
                { id: increment(), name },
            ];
        });
    })
    .flat(2);

export const types = ['fastFood', 'cafe', 'cafeBar'].map((type) => {
    return { id: increment(), name: type, selected: false };
});
