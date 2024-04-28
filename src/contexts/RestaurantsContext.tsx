import { createContext, FC, useState, PropsWithChildren, useEffect } from 'react';
import { options, types } from '../pages/Restaurants/MockRestaurantsList';
import { Restaurant } from '../utils/api/restaurantsService/restaurantsService';
import { restaurantsService } from '../utils/api/restaurantsService/restaurantsService';

export type Option = {
    /**
     * Option's id. Option may be either a meal's name or a venue's name
     */
    id: number;
    /**
     * Option's name
     */
    name: string;
};

export type VenueType = {
    /**
     * Type's id.
     */
    id: number;
    /**
     * Type of venue. Not to be confused with venue's name
     */
    name: string;
};

type RestaurantsContext = {
    /**
     * Set id restaurant which centered in list
     */
    setActiveRestaurant: (id: string) => void;
    /**
     * Restaurant which centered in list
     */
    inView: string;
    /**
     * List of restaurants currently on map
     */
    restaurantsOnMap: Restaurant[];
    /**
     * List of restaurants filtered with user selected options
     */
    restaurantsFiltered: Restaurant[];
    /**
     * Indicates whether restaurants are loading
     */
    isLoading: boolean;
    /**
     * Options' states and controls. Options come from user's input
     */
    options: {
        /**
         * List of all options available
         */
        all: Option[];
        /**
         * List of options selected by user
         */
        selectedOptions: Option[];
        /**
         * Add option to the list of selected options
         */
        addOption: (option: Option) => void;
        /**
         * Remove option from the list of selected options
         */
        deleteOption: (option: Option) => void;
    };
    /**
     * Types of venues states and control
     */
    venueTypes: {
        /**
         * All types of venues found on map
         */
        all: VenueType[];
        /**
         * List of venue types selected by user
         */
        selectedVenueTypes: VenueType[];
        /**
         * Add venue type to the list of selected venue types
         */
        addVenueType: (venueType: VenueType) => void;
        /**
         * Remove venue type from the list of selected venue types
         */
        deleteVenueType: (venueType: VenueType) => void;
    };
};

export const RestaurantsContext = createContext<RestaurantsContext>({
    inView: '',
    setActiveRestaurant: () => {},
    restaurantsOnMap: [],
    restaurantsFiltered: [],
    isLoading: false,
    options: {
        all: [],
        selectedOptions: [],
        addOption: () => {},
        deleteOption: () => {},
    },
    venueTypes: {
        all: [],
        selectedVenueTypes: [],
        addVenueType: () => {},
        deleteVenueType: () => {},
    },
});

export const RestaurantsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [inView, setInView] = useState('');
    const [restaurantsOnMap, setRestaurantsOnMap] = useState<Restaurant[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [selectedVenueTypes, setSelectedVenueTypes] = useState<VenueType[]>([]);
    const optionNames: string[] = selectedOptions.map((option) => option.name.toLowerCase());
    const typeNames: string[] = selectedVenueTypes.map((type) => type.name.toLowerCase());
    const addOption = (option: Option) => {
        const isDouble = selectedOptions.find((opt: Option) => opt.id === option.id);
        if (isDouble) {
            return;
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };
    const setActiveRestaurant = (id: string) => {
        setInView(id);
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
    }, []);
    return (
        <RestaurantsContext.Provider
            value={{
                setActiveRestaurant,
                inView,
                restaurantsOnMap,
                restaurantsFiltered,
                isLoading,
                options: {
                    all: options,
                    selectedOptions,
                    addOption,
                    deleteOption,
                },
                venueTypes: {
                    all: types,
                    selectedVenueTypes,
                    addVenueType,
                    deleteVenueType,
                },
            }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};
