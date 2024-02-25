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
};

export const restaurants: Restaurant[] = [
    {
        id: '1',
        photo: image1,
        name: 'Jahu',
        rating: 4.8,
        address: 'ул. Березовая 21',
        workingTime: '09:00 - 22.00',
    },
    {
        id: '2',
        photo: image2,
        name: 'Boom',
        rating: 4.9,
        address: 'ул. Морозова 56/1',
        workingTime: '10:00 - 23.00',
    },
    {
        id: '3',
        photo: image3,
        name: 'Moon',
        rating: 5.0,
        address: 'пр. Мира 36',
        workingTime: '12:00 - 01.00',
    },
    {
        id: '4',
        photo: image1,
        name: 'Jahu',
        rating: 4.8,
        address: 'ул. Березовая 21',
        workingTime: '09:00 - 22.00',
    },
    {
        id: '5',
        photo: image3,
        name: 'Moon',
        rating: 5.0,
        address: 'пр. Мира 36',
        workingTime: '12:00 - 01.00',
    },
];
