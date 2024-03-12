import image1 from './MockImages/image1.png'
import image2 from './MockImages/image2.png'
import image3 from './MockImages/image3.png'
import image4 from './MockImages/image4.png'
import { Restaurant } from '../../utils/api/restaurantsService/restaurantsService';

export const mockRestaurants: Restaurant[] = [
    {
        id: '1',
        photo: image3,
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
        photo: image4,
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
        photo: image3,
        name: 'Bar',
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

export const types = mockRestaurants
    .map(({ type }) => type)
    .filter((type, i, ar) => ar.indexOf(type) === i)
    .map((type) => {
        return { id: increment(), name: type, selected: false };
    });
