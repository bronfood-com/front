import { createContext, FC, PropsWithChildren } from 'react';
import { Restaurant, Meal } from '../utils/api/restaurantsService/restaurantsService';

/* interface RestaurantInBasket extends Restaurant {

} */

interface MealInBasket extends Meal {
    /**
     * Quantity of particular meal
     */
    quantity: number;
}

type BasketContext = {
    /**
     * Restaurant which meals are in basket
     */
    restaurant: Restaurant;
    /**
     * List of meals in basket
     */
    meals: MealInBasket[];
    /**
     * Indicates whether basket is loading content
     */
    isLoading: boolean;
    /**
     * Increment quantity of meals by 1
     */
    addMeal: (meal: MealInBasket) => void;
    /**
     * Decrement quantity of meals by 1
     */
    deleteMeal: (meal: MealInBasket) => void;
    /**
     * Total price of all meals in basket
     */
    sum: number;
};

export const BasketContext = createContext<BasketContext>({
    restaurant: {},
    meals: [],
    isLoading: false,
    addMeal: () => {},
    deleteMeal: () => {},
    sum: null,
});

export const BasketProvider: FC<PropsWithChildren> = ({ children }) => {
    /*  const [restaurant, setRestaurant] = useState<Restaurant>({});
    const addOption = (option: Option) => {
        const isDouble = selectedOptions.find((opt: Option) => opt.id === option.id);
        if (isDouble) {
            return;
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };
    const deleteOption = (option: Option) => {
        setSelectedOptions(selectedOptions.filter((opt: Option) => opt.id !== option.id));
    };
    const addVenueType = (venueType: VenueType) => {
        setSelectedVenueTypes([...selectedVenueTypes, venueType]);
    };
    const deleteVenueType = (venueType: VenueType) => {
        setSelectedVenueTypes(selectedVenueTypes.filter((type: VenueType) => type.id !== venueType.id));
    };
    const restaurantsFiltered: Restaurant[] = selectedOptions.length === 0 && selectedVenueTypes.length === 0 ? restaurantsOnMap : restaurantsOnMap.filter((restaurant) => restaurant.meals.some((meal) => optionNames.includes(meal.name.toLowerCase())) || optionNames.includes(restaurant.name.toLowerCase()) || typeNames.includes(restaurant.type.toLowerCase()));
    useEffect(() => {
        const fetchRestaurants = async () => {
            setIsLoading(true);
            const res = await restaurantsService.getRestaurants();
            if (res.status === 'error') {
                setRestaurantsOnMap([]);
                setIsLoading(false);
            } else {
                setRestaurantsOnMap(res.data);
                setIsLoading(false);
            }
        };
        fetchRestaurants();
    }, []); */
    return (
        <BasketContext.Provider
            value={{
                restaurant,
                meals: [],
                isLoading: false,
                addMeal: () => {},
                deleteMeal: () => {},
                sum: null,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};
