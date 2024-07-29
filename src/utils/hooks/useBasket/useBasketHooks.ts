import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { basketService } from '../../api/basketService/basketService';

export const useGetBasket = () => {
    return useQuery({
        queryKey: ['basket'],
        queryFn: () => basketService.getBasket(),
    });
};

export const useBasketMutations = () => {
    const queryClient = useQueryClient();
    const addMeal = useMutation({
        mutationFn: ({ restaurantId, mealId, features }: { restaurantId: string; mealId: string; features: Feature[] }) => basketService.addMeal(restaurantId, mealId, features),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
    });
    const deleteMeal = useMutation({
        mutationFn: ({ restaurantId, mealId, features }: { restaurantId: string; mealId: string; features: Feature[] }) => basketService.deleteMeal(restaurantId, mealId, features),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
    });
    const emptyBasket = useMutation({
        mutationFn: () => basketService.emptyBasket(),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
    });
    return {
        addMeal,
        deleteMeal,
        emptyBasket,
    };
};
