import { RestaurantsServiceMock } from './restaurantsServiceMock';
// import { RestaurantsServiceReal } from './restaurantsServiceReal';

export type Choice = {
    /**
     * Choice's id
     */
    id: string;
    /**
     * Choice's name
     */
    name: string;
    /**
     * Choice's price
     */
    price: number;
    /**
     * Is choice selected by default
     */
    default: boolean;
};

export type Feature = {
    /**
     * Feature's id
     */
    id: string;
    /**
     * Feature's name
     */
    name: string;
    /**
     * Feature's choices
     */
    choices: Choice[];
};

export type MealType = 'food' | 'drink' | 'dessert';

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
     * Meal's description
     */
    description: string;
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
    type: MealType;
    /**
     * Meal's cooking time in minutes
     */
    waitingTime: number;
    /**
     * Meal's additions
     */
    features: Feature[] | never[];
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
    getRestaurants: () => Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }>;
}

// export const restaurantsService = new RestaurantsServiceReal();
export const restaurantsService = new RestaurantsServiceMock();
