import { createContext, FC, useState, PropsWithChildren, useEffect } from 'react';
import { mockRestaurants, options, types } from '../pages/Restaurants/MockRestaurantsList';

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

export type VenueType = {
    id: number;
    name: string;
    selected: boolean;
};

type RestaurantsContext = {
    /** List of restaurants currently on map  */
    restaurantsOnMap: Restaurant[];
    /** List of restaurants filtered with user selected options */
    restaurantsFiltered: Restaurant[];
    /** Options' states and controls. Options come from user's input */
    options: {
        /** List of all options available */
        all: Option[];
        /** List of options selected by user */
        selectedOptions: Option[];
        /** Add option to the list of selected options */
        addOption: (option: Option) => void;
        /** Remove option from the list of selected options */
        deleteOption: (option: Option) => void;
    };
    /** Types of venues state and control */
    venueTypes: {
        /** All types of venues found on map */
        types: VenueType[];
        /** Select / deselect venue's type */
        toggleType: (venue: VenueType) => void;
    };
};

export const RestaurantsContext = createContext<RestaurantsContext>({
    restaurantsOnMap: [],
    restaurantsFiltered: [],
    options: {
        all: [],
        selectedOptions: [],
        addOption: () => {},
        deleteOption: () => {},
    },
    venueTypes: {
        types: [],
        toggleType: () => {},
    },
});

export const RestaurantsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [restaurantsOnMap, setRestaurantsOnMap] = useState<Restaurant[]>(mockRestaurants);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [venueTypes, setVenueTypes] = useState<VenueType[]>(types);
    const isTypeSelected: boolean = venueTypes.some((type) => type.selected);
    const optionNames: string[] = selectedOptions.map((option) => option.name.toLowerCase());
    const typeNames: string[] = venueTypes.map((type) => (type.selected ? type.name.toLowerCase() : ''));
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
    const toggleType = (venue: VenueType) => {
        setVenueTypes((venueTypes) =>
            venueTypes.map((type) => {
                if (type.id === venue.id) {
                    return { ...type, selected: !type.selected };
                } else return type;
            }),
        );
    };
    const restaurantsFiltered: Restaurant[] = restaurantsOnMap.filter((restaurant) => {
        if (selectedOptions.length === 0 && !isTypeSelected) {
            return restaurant;
        } else {
            const isMealFound = restaurant.meals.some((meal) => optionNames.includes(meal.name.toLowerCase()));
            const isRestaurantFound = optionNames.includes(restaurant.name.toLowerCase());
            const isTypeFound = typeNames.includes(restaurant.type.toLowerCase());
            if (isMealFound || isRestaurantFound || isTypeFound) {
                return restaurant;
            } else {
                return;
            }
        }
    });
    useEffect(() => {
        setRestaurantsOnMap(mockRestaurants);
    }, []);
    return (
        <RestaurantsContext.Provider
            value={{
                restaurantsOnMap,
                restaurantsFiltered,
                options: {
                    all: options,
                    selectedOptions,
                    addOption,
                    deleteOption,
                },
                venueTypes: {
                    types: venueTypes,
                    toggleType,
                },
            }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};
