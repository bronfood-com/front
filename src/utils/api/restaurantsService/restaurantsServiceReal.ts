import { Restaurant, RestaurantsService } from './restaurantsService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class RestaurantsServiceReal implements RestaurantsService {
    /* contracts https://www.notion.so/API-Restaurant-Meal-Basket-Order-e7947e0efa5948238032620646f28890 */

    async getRestaurants(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        return handleFetch('api/restaurant');
    }
}
