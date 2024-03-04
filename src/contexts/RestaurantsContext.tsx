import { createContext, FC, useState, PropsWithChildren, useMemo, useEffect } from 'react';
import { mockRestaurants } from '../pages/Restaurants/MockRestaurantsList';

export type Meal = {
    id: string;
    name: string;
    photo: string;
    price: number;
    type: 'food' | 'drink' | 'dessert';
};

export type Restaurant = {
    id: string;
    photo: string;
    name: string;
    rating: number;
    address: string;
    workingTime: string;
    meals: Meal[];
    type: 'fastFood' | 'cafe' | 'cafeBar';
};

export type Option = {
    id: number;
    name: string;
};

type RestaurantsContext = {
    restaurantsOnMap: Restaurant[] | [];
    restaurantsFiltered: Restaurant[] | [];
    drawer: {
        isOpen: boolean;
        toggle: () => void;
    };
    filter: {
        isOpen: boolean;
        open: () => void;
        close: () => void;
    };
    restaurant: {
        isOpen: boolean;
        open: () => void;
        close: () => void;
    };
    options: {
        all: Option[];
        selectedOptions: Option[];
        addOption: (option: Option) => void;
        deleteOption: (option: Option) => void;
    };
};

export const RestaurantsContext = createContext<RestaurantsContext>({
    restaurantsOnMap: [],
    restaurantsFiltered: [],
    drawer: {
        isOpen: true,
        toggle: () => {},
    },
    filter: {
        isOpen: false,
        open: () => {},
        close: () => {},
    },
    restaurant: {
        isOpen: false,
        open: () => {},
        close: () => {},
    },
    options: {
        all: [],
        selectedOptions: [],
        addOption: () => {},
        deleteOption: () => {},
    },
});

export const RestaurantsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurantsOnMap, setRestaurantsOnMap] = useState<Restaurant[]>([]);
    const [restaurantsFiltered, setRestaurantsFiltered] = useState<Restaurant[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isRestaurantOpen, setIsRestaurentOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const openFilter = () => setIsFilterOpen(true);
    const closeFilter = () => setIsFilterOpen(false);
    const openRestaurant = () => setIsRestaurentOpen(true);
    const closeRestaurant = () => setIsRestaurentOpen(false);
    const options = useMemo(() => {
        let id = 1;
        const array: Array<Option> = [];
        restaurantsOnMap.forEach(async (restaurant: Restaurant) => {
            await restaurant.meals.forEach((meal) => {
                array.push({ id: id++, name: meal.name });
            });
            array.push({ id: id++, name: restaurant.name });
        });
        return array;
    }, [restaurantsOnMap]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
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
    useEffect(() => {
        if(restaurantsOnMap.length === 0) {
            return
        } else if (selectedOptions.length === 0) {
            setRestaurantsFiltered(restaurantsOnMap);
        } else {
            const optionNames = selectedOptions.map((option) => option.name.toLowerCase());
            const filtered = restaurantsOnMap.filter((restaurant) => {
                const isMealFound = restaurant.meals.some((meal) => optionNames.includes(meal.name.toLowerCase()));
                const isRestaurantFound = optionNames.includes(restaurant.name.toLowerCase());
                if (isMealFound || isRestaurantFound) {
                    return restaurant;
                } else {
                    return;
                }
            });
            setRestaurantsFiltered(filtered);
        }}, [restaurantsOnMap, selectedOptions]);
    useEffect(() => {
        setRestaurantsOnMap(mockRestaurants);
        setRestaurantsFiltered(mockRestaurants);
    }, []);
    return (
        <RestaurantsContext.Provider
            value={{
                restaurantsOnMap,
                restaurantsFiltered,
                drawer: {
                    isOpen: isDrawerOpen,
                    toggle: toggleDrawer,
                },
                filter: {
                    isOpen: isFilterOpen,
                    open: openFilter,
                    close: closeFilter,
                },
                restaurant: {
                    isOpen: isRestaurantOpen,
                    open: openRestaurant,
                    close: closeRestaurant,
                },
                options: {
                    all: options,
                    selectedOptions,
                    addOption,
                    deleteOption,
                },
            }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};
