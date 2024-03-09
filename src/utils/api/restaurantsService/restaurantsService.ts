import { RestaurantsServiceMock } from './restaurantsServiceMock';
// import { AuthServiceReal } from './authServiceReal';

export type Meal = {
    /**
     * Meal's id
     */
    id: string;
    /**
     * Meal's name
     */
    name: string;
    /**
     * Link to meal's image
     */
    photo: string;
    /**
     * Meal's price
     */
    price: number;
    /**
     * Meal's type
     */
    type: 'food' | 'drink' | 'dessert';
};

export type Restaurant = {
    /**
     * Venue's id
     */
    id: string;
    /**
     * Link to venue's image
     */
    photo: string;
    /**
     * Venue's name
     */
    name: string;
    /**
     * Venue's rating
     */
    rating: number;
    /**
     * Venue's address
     */
    address: string;
    /**
     * Venue's open hours
     */
    workingTime: string;
    /**
     * List of venue's meals available for order
     */
    meals: Meal[];
    /**
     * Venue's type
     */
    type: 'fastFood' | 'cafe' | 'cafeBar';
};

export interface RestaurantsService {
    getRestaurantsFromMap: () => Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }>;
}

// export const authService = new AuthServiceReal();
export const restaurantsService = new RestaurantsServiceMock();
