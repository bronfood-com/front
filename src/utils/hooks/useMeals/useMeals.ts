import { useQuery } from '@tanstack/react-query';
import { Meal } from '../../api/restaurantsService/restaurantsService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export const useMeals = (restaurantId: string) => {
    return useQuery({
        queryKey: ['meals', restaurantId],
        queryFn: async (): Promise<Array<Meal>> => handleFetch(`/restaurant/${restaurantId}/meals`),
    });
};
