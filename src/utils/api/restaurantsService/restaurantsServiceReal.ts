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
}
