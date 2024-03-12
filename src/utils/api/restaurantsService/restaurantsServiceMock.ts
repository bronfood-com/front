import { RestaurantsService, Restaurant } from './restaurantsService';
import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

export class RestaurantsServiceMock implements RestaurantsService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    getToken() {
        return 'token';
    }

    async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = this.getToken();
        if (token) {
            return { status: 'success', data: mockRestaurants };
        } else {
            return { status: 'error', error_message: 'error' };
        }
    }
}
