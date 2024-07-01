import { FC, PropsWithChildren, createContext, useCallback, useState } from 'react';
import { options, types } from '../pages/Restaurants/MockRestaurantsList';
import { Meal, Restaurant, restaurantsService } from '../utils/api/restaurantsService/restaurantsService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
     * Reload data restaurants
     */
    refetch: () => void;
    /**
     * Sets clicked restaurant page
     */
    setActiveRestaurant: (id: string) => void;
    /**
     * restaurant to add all meals to it
     */
    restaurant?: Restaurant & { meals: Meal[] };
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
     * Indicates whether query encountered an error
     */
    isError: boolean;
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
    isError: false,
    refetch: () => {},
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
    const [restaurant, setRestaurant] = useState<(Restaurant & { meals: Meal[] }) | undefined>(undefined);
    const queryClient = useQueryClient();

    const { isLoading, isError, data, refetch } = useQuery<Restaurant[]>({
        queryKey: ['restaurants'],
        queryFn: async () => {
            const response = await restaurantsService.getRestaurants();
            if (response.status === 'success') {
                return response.data;
            } else {
                throw new Error('Failed to fetch restaurants');
            }
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const restaurantsOnMap: Restaurant[] = data || [];
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [selectedVenueTypes, setSelectedVenueTypes] = useState<VenueType[]>([]);
    const optionNames: string[] = selectedOptions.map((option) => option.name.toLowerCase());
    const typeNames: string[] = selectedVenueTypes.map((type) => type.name.toLowerCase());
    const restaurantsFiltered: Restaurant[] = selectedOptions.length === 0 && selectedVenueTypes.length === 0 ? restaurantsOnMap : restaurantsOnMap.filter((restaurant) => restaurant.meals.some((meal) => optionNames.includes(meal.name.toLowerCase())) || optionNames.includes(restaurant.name.toLowerCase()) || typeNames.includes(restaurant.type.toLowerCase()));

    const setActiveRestaurant = useCallback(
        async (id: string) => {
            if (id !== inView) {
                setInView(id);

                const cachedRestaurant = queryClient.getQueryData<Restaurant[]>(['restaurants'])?.find((restaurant) => restaurant.id === id);
                if (cachedRestaurant) {
                    setRestaurant(cachedRestaurant);
                } else {
                    const response = await restaurantsService.getRestaurantById(id);
                    if (response.status === 'success') {
                        setRestaurant(response.data);
                    } else {
                        console.error(response.error_message);
                    }
                }
            }
        },
        [inView, queryClient]
    );

    const addOption = (option: Option) => {
        setSelectedOptions((prevOptions) => {
            if (prevOptions.find((opt) => opt.id === option.id)) {
                return prevOptions;
            }
            return [...prevOptions, option];
        });
    };

    const deleteOption = (option: Option) => {
        setSelectedOptions((prevOptions) => prevOptions.filter((opt) => opt.id !== option.id));
    };

    const addVenueType = (venueType: VenueType) => {
        setSelectedVenueTypes((prevTypes) => {
            if (prevTypes.find((type) => type.id === venueType.id)) {
                return prevTypes;
            }
            return [...prevTypes, venueType];
        });
    };

    const deleteVenueType = (venueType: VenueType) => {
        setSelectedVenueTypes((prevTypes) => prevTypes.filter((type) => type.id !== venueType.id));
    };

    return (
        <RestaurantsContext.Provider
            value={{
                setActiveRestaurant,
                inView,
                restaurantsOnMap,
                restaurantsFiltered,
                restaurant,
                isLoading: isLoading,
                isError,
                refetch: refetch,
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
