import { createContext, FC, useState, PropsWithChildren, useMemo, useEffect } from 'react';
import { mockRestaurants } from '../pages/Restaurants/MockRestaurantsList';

type Meal = {
    id: string;
    name: string;
    photo: string;
    price: number;
    type: 'food' | 'drink' | 'dessert';
    features?: Features;
};

type Restaurant = {
    id: string;
    photo: string;
    name: string;
    rating: number;
    address: string;
    workingTime: string;
    meals: Meal[];
    type: 'fastFood' | 'cafe' | 'cafeBar';
};

type Option = {
    id: string,
    name: string,
}

type RestaurantsContext = {
    restaurantsOnMap: Restaurant[] | [];
    restaurantsFiltered: Restaurant[] | [];
    drawer: {
        isOpen: boolean,
        toggle: () => void,
    };
    filter: {
        isOpen: boolean,
        open: () => void,
        close: () => void,
    };
    restaurant: {
        isOpen: boolean,
        open: () => void,
        close: () => void,
    };
    options: {
        all: Option[],
        selectedOptions: Option[],
        addOption: () => void;
        deleteOption: () => void;
    }
};

export const RestaurantsContext = createContext<RestaurantsContext>({
    restaurantsOnMap: mockRestaurants,
    restaurantsFiltered: mockRestaurants,
    drawer: {
        isOpen: true,
        toggle: undefined,
    },
    filter: {
        isOpen: false,
        open: undefined,
        close: undefined,
    },
    restaurant: {
        isOpen: false,
        open: undefined,
        close: undefined,
    },
    options: {
        all: [],
        selectedOptions: [],
        addOption: undefined,
        deleteOption: undefined,
    }
});

export const RestaurantsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurantsOnMap, setRestaurantsOnMap] = useState([]);
    const [restaurantsFiltered, setRestaurantsFiltered] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const openFilter = () => setIsFilterOpen(true);
    const closeFilter = () => setIsFilterOpen(false);
    const options = useMemo(() => {
        let id = 1;
        const array = [];
        restaurantsOnMap.forEach((restaurant) => {
            restaurant.meals.forEach((meal) => {
                array.push({ id: id++, name: meal.name });
            });
        });
        return array;
    }, [restaurantsOnMap]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const addOption = (option) => {
        const isDouble = selectedOptions.find((opt) => opt.id === option.id);
        if (isDouble) {
            return;
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };
    const deleteOption = (option) => {
        setSelectedOptions(selectedOptions.filter((opt) => opt.id !== option.id));
    };
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
                    isOpen: false,
                    open: undefined,
                    close: undefined,
                },
                options: {
                    all: options,
                    selectedOptions,
                    addOption,
                    deleteOption,
                }
            }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};
