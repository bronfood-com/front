// import { Restaurant, RestaurantsService } from './restaurantsService';
// import { API_URL } from '../../consts';

// export class RestaurantsServiceReal implements RestaurantsService {
//     _getToken() {
//         return localStorage.getItem('token');
//     }

//     async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
//         const token = this._getToken();
//         if (!token) {
//             return {
//                 status: 'error',
//                 error_message: 'Пройдите авторизацию',
//             };
//         } else {
//             const res = await fetch(`${API_URL}/api/restaurant/`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8',
//                     authorization: `Token ${token}`,
//                 },
//             });
//             if (!res.ok) {
//                 throw new Error('error');
//             }
//             return res.json();
//         }
//     }

//     async getRestaurantById(id: string): Promise<Restaurant> {
//         const token = this._getToken();
//         if (!token) {
//             throw new Error('Пройдите авторизацию');
//         } else {
//             try {
//                 const res = await fetch(`${API_URL}/api/restaurant/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json;charset=utf-8',
//                         authorization: `Token ${token}`,
//                     },
//                 });

//                 if (!res.ok) {
//                     const errorText = await res.text();
//                     throw new Error(`Network response was not ok: ${errorText}`);
//                 }

//                 const json = await res.json();
//                 console.log('API raw response:', json);

//                 return json;
//             } catch (error) {
//                 if (error instanceof Error) {
//                     console.error('Fetch error:', error.message);
//                     throw new Error(error.message || 'Unknown error');
//                 } else {
//                     console.error('Unexpected fetch error:', error);
//                     throw new Error('Unexpected error');
//                 }
//             }
//         }
//     }
// }

import { Restaurant, RestaurantsService } from './restaurantsService';
import { API_URL } from '../../consts';

export class RestaurantsServiceReal implements RestaurantsService {
    /* contracts https://www.notion.so/API-Restaurant-Meal-Basket-Order-e7947e0efa5948238032620646f28890 */

    _getToken() {
        return localStorage.getItem('token');
    }
    async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        const token = this._getToken();
        if (!token) {
            return {
                status: 'error',
                error_message: 'Пройдите авторизацию',
            };
        } else {
            const res = await fetch(`${API_URL}/api/restaurant/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: `Token ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error('error');
            }
            return res.json();
        }
    }

    async getRestaurantById(id: string): Promise<{ status: 'success'; data: Restaurant } | { status: 'error'; error_message: string }> {
        const token = this._getToken();
        if (!token) {
            return {
                status: 'error',
                error_message: 'Пройдите авторизацию',
            };
        }
        const res = await fetch(`${API_URL}/api/restaurant/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Token ${token}`,
            },
        });
        if (!res.ok) {
            return {
                status: 'error',
                error_message: 'Ошибка при выполнении запроса',
            };
        }
        const data = await res.json();
        return {
            status: 'success',
            data,
        };
    }
}
