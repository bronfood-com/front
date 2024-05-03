import { BasketService, Basket } from './basketService';
import { Feature, Meal, Restaurant } from '../restaurantsService/restaurantsService';
import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';

export class BasketServiceMock implements BasketService {
    private basket: Basket = {
        restaurant: {},
        meals: [],
    };
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
    async addMeal(mealId: string, features: Feature[] | never[]): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        const restaurantFound = mockRestaurants.find((restaurant: Restaurant) => {
            const found = restaurant.meals.find((meal) => meal.id === mealId);
            if (found) {
                return restaurant;
            }
        });
        const hasRestaurantChanged = restaurantFound && this.basket.restaurant.id !== restaurantFound.id;
        const mealFoundInBasket = this.basket.meals.find(({ meal }) => meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features));
        const mealFoundInRestaurants = restaurantFound && restaurantFound.meals.find((meal: Meal) => meal.id === mealId);
        if (mealFoundInBasket) {
            this.basket.meals = this.basket.meals.map(({ meal, count }) => {
                if (meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features)) {
                    return { meal, count: count + 1 };
                } else {
                    return { meal, count };
                }
            });
            return { status: 'success', data: this.basket };
        } else if (mealFoundInRestaurants) {
            if (this.basket.meals.length === 0 || hasRestaurantChanged) {
                this.basket.restaurant = restaurantFound;
                if (features.length > 0) {
                    this.basket.meals = [{ meal: { ...mealFoundInRestaurants, features, id: mealFoundInRestaurants.id }, count: 1 }];
                } else {
                    this.basket.meals = [{ meal: mealFoundInRestaurants, count: 1 }];
                }
            } else {
                this.basket.meals = [...this.basket.meals, { meal: { ...mealFoundInRestaurants, features, id: mealFoundInRestaurants.id }, count: 1 }];
            }
            return { status: 'success', data: this.basket };
        } else {
            throw new Error('error');
        }
    }
    async deleteMeal(mealId: string, features: Feature[] | never[]): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        const mealFoundInBasket = this.basket.meals.find(({ meal }) => meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features));
        if (mealFoundInBasket && mealFoundInBasket.count > 1) {
            this.basket.meals = this.basket.meals.map(({ meal, count }) => {
                if (meal.id === mealId && JSON.stringify(meal.features) === JSON.stringify(features)) {
                    return { meal, count: count - 1 };
                } else {
                    return { meal, count };
                }
            });
            return { status: 'success', data: this.basket };
        } else if (mealFoundInBasket && mealFoundInBasket.count === 1) {
            this.basket.meals = this.basket.meals.filter(({ meal }) => {
                if (meal.id !== mealId) {
                    return true;
                } else if (JSON.stringify(meal.features) !== JSON.stringify(features)) {
                    return true;
                } else {
                    return false;
                }
            });
            return { status: 'success', data: this.basket };
        } else {
            throw new Error('error');
        }
    }
    async emptyBasket(): Promise<{ status: 'success'; data: Basket } | { status: 'error'; error_message: string }> {
        await this._wait(500);
        this.basket.restaurant = {};
        this.basket.meals = [];
        const success = true;
        if (success) {
            return { status: 'success', data: this.basket };
        } else {
            throw new Error('error');
        }
    }
}
