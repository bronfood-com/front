import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../../utils/api/restaurantsService/restaurantsService';

const useRestaurantById = (id: string) => {
    return useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => restaurantsService.getRestaurantById(id),
    });
};

export default useRestaurantById;
