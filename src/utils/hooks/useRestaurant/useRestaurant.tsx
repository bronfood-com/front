import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';
import { Restaurant } from '../../api/restaurantsService/restaurantsService';

const getRestaurantById = async (id: string): Promise<Restaurant> => {
    const response = await restaurantsService.getRestaurantById(id);

    if (response.status === 'success') {
        return response.data;
    } else {
        throw new Error(response.error_message || 'API response does not contain expected keys');
    }
};

export const useRestaurant = (id: string) => {
    return useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => getRestaurantById(id),
        enabled: !!id,
        retry: false,
    });
};
